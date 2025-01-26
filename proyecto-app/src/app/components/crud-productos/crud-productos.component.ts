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
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Producto } from '../../models/Producto';
import { ProductosjsonService } from '../../services/productosjson.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { ProductosApiService } from '../../services/productos-api.service';

@Component({
  selector: 'app-crud-productos',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule, DatePipe,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './crud-productos.component.html',
  styleUrl: './crud-productos.component.css'
})
export class CrudProductosComponent implements OnInit, AfterViewInit{
  form! :FormGroup;
  isEditMode:boolean = false;
  currentId! :string;

  //DataSource(fuente de datos) para mi tabla
  dataSource = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }
  

  ngOnInit():void{
  this.getProductos();
  //Inicializar las variables asociadas a los componentes de los formularios
  this.form= this.fb.group({

      nombre:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      categoria: ["",[Validators.required]],
      isAvailable:[false] ,
      cantidadStock: ["",[Validators.required]],
      precio: ["",[Validators.required]],
      fechaAgregado: ["",[Validators.required]],
      imagen: [""],
  });
  }

  
  constructor(private productoService:ProductosApiService, private fb: FormBuilder, private dialog: MatDialog, private noti: MatDialog){
  }

  getProductos(): void{
    this.productoService.getProductos().subscribe((datos:Producto[])=>{
      this.dataSource.data = datos;
    });
  }

  search(searchInput:HTMLInputElement){
    if(searchInput.value){//search.value es lo que el usuario escribio en la caja de texto
      //buscar
      this.productoService.getProductoSearch(searchInput.value).subscribe((datos:Producto[])=>{
        this.dataSource.data = datos;
      });

    }else{// listar todas las peliculas
      this.getProductos();
    }
  }

  eliminar(producto:Producto){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        titulo:"Eliminar " ,
        contenido: 'Desea eliminar este producto' +  " ?"
      }
    }); //Abrir la ventana
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="Aceptar"){
        this.productoService.deleteProducto(producto).subscribe(()=>{
          // alert("Eliminado exitosamente");
          const notiRef = this.noti.open(NotificationComponent,{
            data:{
              titulo:"CONFIRMACION",
              contenido: "Se elimino Satisfactoriamente"
            }
          });
          notiRef.afterClosed().subscribe(result=>{
          });
          this.getProductos(); //actualizar el dataSource
        });
      }else if(result==="Cancelar"){
        this.getProductos();
      }
    })


    

  }

  editar(producto:Producto){

    this.isEditMode = true;

    if(producto && producto.id){
      this.currentId = producto.id;
    }else{
      console.log("Producto o el Id del producto estan undefined");
    }

    //Cargar los datos del producto en los controles del formulario
    this.form.setValue({
      nombre: producto.nombre,
      categoria: producto.categoria,
      isAvailable: producto.isAvailable,
      cantidadStock: producto.cantidadStock,
      precio: producto.precio,
      fechaAgregado: producto.fechaAgregado,
      imagen: producto.imagen,
    });
  }

  onSubmit(){
    //es guardar la garantia

    //revisar si el formulario es valido
    if(this.form.invalid){
      return;
    }

    //obtener los datos de los controles del formulario
    const newProducto: Producto= this.form.value;

    if(this.isEditMode){//editar

      newProducto.id = this.currentId;

      const dialogRef = this.dialog.open(DialogComponent,{
        data:{
          titulo:"Editar ",
          contenido: 'Desea guardar la modificacion de este Producto ' + " ?"
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.productoService.updateProducto(newProducto).subscribe((updateProducto)=>{
            // alert("Producto editado exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se edito Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getProductos(); // actualizar el datasource de la table de productos
          });
        }else if(result==="Cancelar"){
          this.getProductos();
        }
      })
      
    }else{//agregar

      const dialogRef = this.dialog.open(DialogComponent,{
        data:{
          titulo:"Agregar Nuevo Producto" ,
          contenido: 'Desea guardar este nuevo Producto? ' + " ?"
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.productoService.addProductos(newProducto).subscribe((addProductos)=>{
            // alert("Producto agregado exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se agrego Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getProductos(); // actualizar el datasource de la table de productos
          });
        }else if(result==="Cancelar"){
          this.getProductos();
        }
      })
    }
    
  }

  clearForm():void{
    this.form.reset({
      nombre: '',
      categoria:'',
      isAvailable: '',
      cantidadStock: '',
      precio: '',
      fechaAgregado: '',
      imagen: '',
    });
    this.currentId = '';
    this.isEditMode = false;
  }
}
