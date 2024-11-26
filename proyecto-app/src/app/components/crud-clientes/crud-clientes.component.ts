import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Clientes } from '../../models/Clientes';
import { MatPaginator } from '@angular/material/paginator';
import { ClientesjsonService } from '../../services/clientesjson.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { NotificationComponent } from '../../shared/notification/notification.component';



@Component({
  selector: 'app-crud-clientes',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginator, DatePipe,
    MatCheckboxModule, MatDatepickerModule, MatOptionModule, MatFormFieldModule, ReactiveFormsModule, MatNativeDateModule],
  templateUrl: './crud-clientes.component.html',
  styleUrl: './crud-clientes.component.css'
})
export class CrudClientesComponent implements OnInit, AfterViewInit{
  form!:FormGroup;
  isEditMode: boolean = false;
  currentId!:number;
  dataSource = new MatTableDataSource<Clientes>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getClientes();
    this.form = this.fb.group({
      id: [" ",[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      email: ["",[Validators.required]],
      telefono:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      direccion:["",[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      fechaRegistro:["",[Validators.required]],
      estado:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]]
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
  }
  constructor(private clienteService:ClientesjsonService, private fb: FormBuilder, private mydialog: MatDialog, private noti: MatDialog){
  }
  getClientes():void{
    this.clienteService.getClientes().subscribe((datos:Clientes[])=>{
      this.dataSource.data = datos;
    });
  }
  search(searchInput: HTMLInputElement){
    if(searchInput.value){
      const id = Number(searchInput.value);
      this.clienteService.getClientesSearch(id).subscribe((datos:Clientes[])=>{
        this.dataSource.data = datos;
      });
    }else{
      this.getClientes();
    }
  }
  
  eliminar(cliente:Clientes){
    const dialogRef = this.mydialog.open(DialogComponent,{
      data:{
        titulo:"Eliminar " ,
        contenido: 'Desea eliminar este cliente' +  " ?"
      }
    }); 
    dialogRef.afterClosed().subscribe(result=>
      {if(result==="Aceptar"){
    this.clienteService.deleteCliente(cliente).subscribe(()=>{
      alert("Eliminado con éxito");
      this.getClientes();
      const notiRef = this.noti.open(NotificationComponent,{
        data:{
          titulo:"CONFIRMACION",
          contenido: "Se elimino Satisfactoriamente"
        }
      });
      notiRef.afterClosed().subscribe(result=>{
      });
      this.getClientes();
    });
  }else if(result==="Cancelar"){
    this.getClientes();
    }
    })
  }
  editar(cliente:Clientes){
    this.isEditMode = true;

    if(cliente && cliente.id){
      this.currentId = cliente.id;
    }else{
      console.log("El id del cliente esta indefinido");
    }

    this.form.setValue({
      id: cliente.id,
      nombre: cliente.nombre,
      email:cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      fechaRegistro: cliente.fechaRegistro,
      estado: cliente.estado,
    });
  }
  onSubmit(){
    if(this.form.invalid){
      return;
    }
    const newCliente: Clientes= this.form.value;
    if(this.isEditMode){
      newCliente.id = this.currentId;

      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Editar ",
          contenido: ' Desea modificar este cliente ' + " ?"
        }
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.clienteService.updateCliente(newCliente).subscribe((updateCliente)=>{
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se edito Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getClientes(); 
          });
        }else if(result==="Cancelar"){
          this.getClientes();
        }
      })
    }else{
      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Agregar Nuevo Cliente" ,
          contenido: 'Desea guardar este nuevo cliente? ' + " ?"
        }
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="Aceptar"){
        this.clienteService.addCliente(newCliente).subscribe((addCliente)=>{
          const notiRef = this.noti.open(NotificationComponent,{
            data:{
              titulo:"CONFIRMACION",
              contenido: "Se agrego Exitosamente"
            }
          });
          notiRef.afterClosed().subscribe(result=>{
          });
          this.clearForm();
          this.getClientes(); 
        });
      }else if(result==="Cancelar"){
        this.getClientes();
      }
    })
   }
  }
  clearForm():void{
    this.form.reset({
      id: '',
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      fechaRegistro: '',
      estado: '',
    });
    this.currentId = 0;
    this.isEditMode = false;
  }
}