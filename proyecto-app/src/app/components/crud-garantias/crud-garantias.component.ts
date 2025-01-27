import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Garantia } from '../../models/Garantia';
import { GarantiasjsonService } from '../../services/garantiasjson.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { GarantiasApiService } from '../../services/garantias-api.service';

@Component({
  selector: 'app-crud-garantias',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule, DatePipe,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './crud-garantias.component.html',
  styleUrl: './crud-garantias.component.css'
})
export class CrudGarantiasComponent implements OnInit, AfterViewInit{
  form! :FormGroup;
  isEditMode:boolean = false;
  currentId! :number;
  title:string = "CRUD GARANTIAS";

  //DataSource(fuente de datos) para mi tabla
  dataSource = new MatTableDataSource<Garantia>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }
  

  ngOnInit():void{
  this.getGarantias();
  //Inicializar las variables asociadas a los componentes de los formularios
  this.form= this.fb.group({
    cliente_id:["", [Validators.required]],
    producto: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
    numeroFactura:["",[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
    fechaCompra: ["",[Validators.required]],
    descripcion: ["",[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
    estado: "Pendiente",
    fechaRegistro: ["",[Validators.required]],
    ultimaActualizacion: [""],
  });
  }

  
  constructor(private garantiaService: GarantiasApiService, private fb: FormBuilder, private mydialog: MatDialog, private noti: MatDialog){
  }

  getGarantias(): void{
    this.garantiaService.getGarantias().subscribe((datos:Garantia[])=>{
      this.dataSource.data = datos;
    });
  }

  search(searchInput:HTMLInputElement){
    if(searchInput.value){//search.value es lo que el usuario escribio en la caja de texto
      //buscar
      this.garantiaService.getGarantiaSearch(searchInput.value).subscribe((datos:Garantia[])=>{
        this.dataSource.data = datos;
      });

    }else{// listar todas las peliculas
      this.getGarantias();
    }
  }

  eliminar(garantia:Garantia){
    const dialogRef = this.mydialog.open(DialogComponent,{
      data:{
        titulo:"Eliminar " ,
        contenido: 'Desea eliminar este registro de garantia' +  " ?"
      }
    }); //Abrir la ventana
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="Aceptar"){
        this.garantiaService.deleteGarantia(garantia).subscribe(()=>{
          // alert("Eliminado exitosamente");
          const notiRef = this.noti.open(NotificationComponent,{
            data:{
              titulo:"CONFIRMACION",
              contenido: "Se elimino Satisfactoriamente"
            }
          });
          notiRef.afterClosed().subscribe(result=>{
          });
          this.getGarantias(); //actualizar el dataSource
        });
      }else if(result==="Cancelar"){
        this.getGarantias();
      }
    })


    

  }

  editar(garantia:Garantia){

    this.isEditMode = true;

    if(garantia && garantia.id){
      this.currentId = garantia.id;
    }else{
      console.log("Garantia o el Id de la garantia estan undefined");
    }

    //Cargar los datos de la pelicula en los controles del formulario
    this.form.setValue({
      cliente_id: garantia.cliente_id,
      producto: garantia.producto,
      numeroFactura:garantia.numeroFactura,
      fechaCompra: garantia.fechaCompra,
      descripcion: garantia.descripcion,
      estado: garantia.estado,
      fechaRegistro: garantia.fechaRegistro,
      ultimaActualizacion: garantia.ultimaActualizacion,
    });
  }

  onSubmit(){
    //es guardar la garantia

    //revisar si el formulario es valido
    if(this.form.invalid){
      return;
    }

    //obtener los datos de los controles del formulario
    const newGarantia: Garantia= this.form.value;

    if(this.isEditMode){//editar

      newGarantia.id = this.currentId;

      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Editar ",
          contenido: 'Desea guardar la modificacion de esta garantia ' + " ?"
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.garantiaService.updateGarantia(newGarantia).subscribe((updateGarantia)=>{
            // alert("Garantia editada exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se edito Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getGarantias(); // actualizar el datasource de la table de garantias
          });
        }else if(result==="Cancelar"){
          this.getGarantias();
        }
      })
      
    }else{//agregar

      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Agregar Nueva Garantia" ,
          contenido: 'Desea guardar esta nueva Garantia? ' + " ?"
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.garantiaService.addGarantia(newGarantia).subscribe((addGarantia)=>{
            // alert("Garantia agregada exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se agrego Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getGarantias(); // actualizar el datasource de la table de garantias
          });
        }else if(result==="Cancelar"){
          this.getGarantias();
        }
      })
    }
    
  }

  clearForm():void{
    this.form.reset({
      cliente_id: '',
      producto: '',
      numeroFactura: '',
      fechaCompra: '',
      descripcion: '',
      estado: '',
      fechaRegistro: '',
      ultimaActualizacion: '',
    });
    this.currentId = 0;
    this.isEditMode = false;
  }
}
