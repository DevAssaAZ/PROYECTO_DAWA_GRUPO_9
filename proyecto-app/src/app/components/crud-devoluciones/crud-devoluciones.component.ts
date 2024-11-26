import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevolucionesjsonService } from '../../services/devolucionesjson.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Devolucion } from '../../models/Devolucion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { DialogComponent } from '../../shared/dialog/dialog.component';




@Component({
  selector: 'app-crud-devoluciones',
  standalone: true,
  imports: [MatLabel,ReactiveFormsModule,CommonModule,MatFormField,MatButtonModule,MatInputModule,MatPaginatorModule,DatePipe,MatTableModule,MatRadioModule,MatSelectModule,MatCheckboxModule,MatDatepickerModule,MatOptionModule, MatFormFieldModule,MatNativeDateModule,ReactiveFormsModule,],
  templateUrl: './crud-devoluciones.component.html',
  styleUrl: './crud-devoluciones.component.css'
})
export class CrudDevolucionesComponent implements OnInit, AfterViewInit{
  form!: FormGroup;
  isEditMode:boolean = false;
  currentId!: number;

  //dataSource (fuente de datos) para mi tabla
  dataSource = new MatTableDataSource<Devolucion>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  fechaMinima: Date = new Date(1940, 0,1);
  fechaMaxima: Date = new Date();//fecha actual


  displayedColumns: string[] = ['cliente', 'producto', 'descripcion', 'fechaSolicitud', 'estado', 'acciones'];

   
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getDevoluciones();
    //inicializar las variables asociadas a los componentes del formulario
    this.form = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      producto: ['', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      cantidad:[''],
      descripcion: ['', Validators.required],
      estado: [''],
      fechaSolicitud: ['', Validators.required],
      prioridad:[false],
    });
  }
  
  constructor( private devolucionesService:DevolucionesjsonService, private fb: FormBuilder,
    private mydialog: MatDialog,  

  ){}
    
  getDevoluciones() {
    this.devolucionesService.getDevoluciones().subscribe((datos:Devolucion[])=>{
      this.dataSource.data = datos;
    });  
  }

  editar(devolucion:Devolucion){
    this.isEditMode=true;
    if(devolucion && devolucion.id){
      this.currentId = devolucion.id;
    } else{
      console.log("La devolucion de este producto esta indefinido");
    }

    this.form.setValue({
      cliente: devolucion.cliente,
      producto: devolucion.producto,
      cantidad: devolucion.cantidad,
      descripcion:devolucion.descripcion,
      fechaSolicitud: devolucion.fechaSolicitud,
      estado: devolucion.estado,
      prioridad: devolucion.prioridad,
    });

  }
  
  onSubmit(){
    //es guardar la devolucion

    //revisar si el formulario es valido
    if(this.form.invalid){
      console.log("invalido");
      return;
    }
    //obtener los datos de los controles del formulario
    const newDevolucion:Devolucion = this.form.value;

    if(this.isEditMode){
      newDevolucion.id = this.currentId;
      this.devolucionesService.updateDevolucion(newDevolucion).subscribe((updateDevolucion)=>{
        alert("Edicion para la respectiva devolucion fue editada exitosamente");
        this.getDevoluciones();
      });
    } else{
      this.devolucionesService.addDevolucion(newDevolucion).subscribe((addDevolucion)=>{
        alert("Proceso de devolucion agregada exitosamente");
        this.getDevoluciones();
      });
    }

    this.clearForm();

  }

  clearForm():void{
    this.form.reset({
      cliente:'',
      cantidad:'',
      producto:'',
      descripcion:'',
      fechaSolicitud:'',
      estado:'',
      prioridad:'',
    });
    this.currentId=0;
    this.isEditMode=false;
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){ // searchInput.value es lo que el usuario escribio en la caja de texto
      //buscar
      this.devolucionesService.getDevolucionSearch(searchInput.value).subscribe((datos:Devolucion[])=>{
        this.dataSource.data = datos;
      });
    }else{ //listar todas las peliculas
      this.getDevoluciones();
    }
  }

  deleteDevolucion(devolucion:Devolucion){

    const dialogRef=this.mydialog.open(DialogComponent, {
      data:{
        titulo: "Eliminacion de la devolucion",
        contenido: "Estas seguro de eliminar la devolucion del producto " +devolucion.producto + " ?"
      },
    }); //abrir la ventana de dialogo
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){ // que quiero que suceda si dio click en aceptar
        this.devolucionesService.deleteMovie(devolucion).subscribe(()=>{
          alert("Eliminado exitosamente");
          this.getDevoluciones(); //para que se actualice el dataSource
        });      
      }else if(result==="cancelar"){  // que quiero que suceda si dio click en cancelar
        console.error("Cancelar");
      }
    });

  }


}
