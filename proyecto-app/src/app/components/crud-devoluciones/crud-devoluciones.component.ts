import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DevolucionesjsonService } from '../../services/devolucionesjson.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Devolucion } from '../../models/Devolucion';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-crud-devoluciones',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatPaginatorModule,DatePipe,MatTableModule,MatRadioModule,MatSelectModule,MatCheckboxModule,MatDatepickerModule,MatOptionModule, MatFormFieldModule,MatNativeDateModule,ReactiveFormsModule,],
  templateUrl: './crud-devoluciones.component.html',
  styleUrl: './crud-devoluciones.component.css'
})
export class CrudDevolucionesComponent implements OnInit{
  form!: FormGroup;
  isEditMode = false;
  currentId!: number;

  //dataSource (fuente de datos) para mi tabla
  dataSource = new MatTableDataSource<Devolucion>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
   
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getDevoluciones();
    //inicializar las variables asociadas a los componentes del formulario
    this.form= this.fb.group({
      id:[""],
      cliente:[""],
      producto:[""],
      descripcion:[""],
      fechaSolicitud:[""],
      estado:[""],
    });  
  }
  
  constructor( private devolucionesService:DevolucionesjsonService, private fb: FormBuilder,
    private mydialog: MatDialog
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
      id: devolucion.id,
      cliente: devolucion.cliente,
      producto: devolucion.producto,
      descripcion:devolucion.descripcion,
      fechaSolicitud: devolucion.fechaSolicitud,
      estado: devolucion.estado,
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
    const newPelicula:Devolucion = this.form.value;

    if(this.isEditMode){
      newPelicula.id = this.currentId;
      this.devolucionesService.updateDevolucion(newPelicula).subscribe((updatePelicula)=>{
        alert("Pelicula fue editada exitosamente");
        this.getDevoluciones();
      });
    } else{
      this.devolucionesService.addDevolucion(newPelicula).subscribe((addPelicula)=>{
        alert("Pelicula fue agregada exitosamente");
        this.getDevoluciones();
      });
    }

    this.clearForm();

  }

  clearForm():void{
    this.form.reset({
      id:'',
      cliente:'',
      producto:'',
      descripcion:'',
      fechaSolicitud:'',
      estado:'',
    });
    this.currentId=0;
    this.isEditMode=false;
  }

  
}
