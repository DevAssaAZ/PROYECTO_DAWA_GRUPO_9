import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SoportejsonService } from '../../services/soportejson.service';
import { MatDialog } from '@angular/material/dialog';
import { Soporte } from '../../models/SolicitudesSoporte';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DatePipe, NgIf } from '@angular/common';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { SoporteApiService } from '../../services/soporte-api.service';

@Component({
  selector: 'app-crud-solicitud-soporte',
  standalone: true,
  imports: [NgIf, MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule, DatePipe,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatOption, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule, MatError, MatSelect, MatDatepicker, MatInput, MatTable, MatDatepickerToggle],
  templateUrl: './crud-solicitud-soporte.component.html',
  styleUrl: './crud-solicitud-soporte.component.css'
})
export class CrudSolicitudSoporteComponent {
  form!: FormGroup;
  isEditMode: boolean = false;
  currentId!: number;
  title: string = "CRUD de Soporte";

  // DataSource para la tabla
  dataSource = new MatTableDataSource<Soporte>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSoportes();
    // Inicializar el formulario
    this.form = this.fb.group({
      id: ["", [Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      cliente_id: ["", [Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      descripcion: ["", [Validators.required, Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      producto: ["", [Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      fecha_solicitud: ["", [Validators.required]],
      estado: ['Pendiente', [Validators.required]],
    });
  }

  constructor(private soporteService: SoporteApiService,private fb: FormBuilder,private mydialog: MatDialog,private noti: MatDialog) {

  }

  // Obtener todos los soportes
  getSoportes(): void {
    this.soporteService.getSoportes().subscribe((datos: Soporte[]) => {
      this.dataSource.data = datos;
    });
  }

  // Buscar soporte
  search(searchInput: HTMLInputElement): void {
    if (searchInput.value) {
      this.soporteService.getSoporteSearch(searchInput.value).subscribe((datos: Soporte[]) => {
        this.dataSource.data = datos;
      });
    } else {
      this.getSoportes();
    }
  }

  // Eliminar soporte
  eliminar(soporte: Soporte): void {
    const dialogRef = this.mydialog.open(DialogComponent, {
      data: {
        titulo: "Eliminar Soporte",
        contenido: `¿Desea eliminar el soporte con ID ${soporte.id}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.soporteService.deleteSoporte(soporte).subscribe(() => {
          const notiRef = this.noti.open(NotificationComponent, {
            data: {
              titulo: "Confirmación",
              contenido: "Soporte eliminado exitosamente."
            }
          });
          this.getSoportes();
        });
      }
    });
  }

  // Editar soporte
  editar(soporte: Soporte): void {
    this.isEditMode = true;
    this.currentId = soporte.id??1;

    this.form.setValue({
      id: soporte.id,
      cliente_id: soporte.cliente_id,
      descripcion: soporte.descripcion,
      producto: soporte.producto,
      fecha_solicitud: soporte.fecha_solicitud,
      estado: soporte.estado,
    });
  }

  // Guardar o actualizar soporte
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const newSoporte: Soporte = this.form.value;

    if(this.isEditMode){//editar

      newSoporte.id = this.currentId;

      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Editar ",
          contenido: 'Desea guardar la modificacion de esta solicitud de soporte?'
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.soporteService.updateSoporte(newSoporte).subscribe((updateSoporte)=>{
            // alert("Solicitud de soporte editada exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se edito Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getSoportes(); // actualizar el datasource de la table de soporte
          });
        }else if(result==="Cancelar"){
          this.getSoportes();
        }
      })
      
    }else{//agregar

      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo:"Agregar Nueva Solicitud de Soporte" ,
          contenido: 'Desea guardar esta nueva solicitud de soporte?'
        }
      }); //Abrir la ventana
      dialogRef.afterClosed().subscribe(result=>{
        if(result==="Aceptar"){
          this.soporteService.addSoporte(newSoporte).subscribe((addSoporte)=>{
            // alert("Solicitud de soporte agregada exitosamente");
            const notiRef = this.noti.open(NotificationComponent,{
              data:{
                titulo:"CONFIRMACION",
                contenido: "Se agrego Exitosamente"
              }
            });
            notiRef.afterClosed().subscribe(result=>{
            });
            this.clearForm();
            this.getSoportes(); // actualizar el datasource de la table de soporte
          });
        }else if(result==="Cancelar"){
          this.getSoportes();
        }
      })
    }
  }

  onEstadoChange(event: any): void {
    console.log('Estado seleccionado:', event.value);
  }

  // Limpiar formulario
  clearForm(): void {
    this.form.reset({
      cliente_id: '',
      titulo: '',
      descripcion: '',
      producto: '',
      fecha_solicitud: '',
      estado: 'Pendiente',
    });
    this.isEditMode = false;
    this.currentId = 0;
  }
}

