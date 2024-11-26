import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SoportejsonService } from '../../services/soportejson.service';
import { MatDialog } from '@angular/material/dialog';
import { Soporte } from '../../models/SolicitudesSoporte';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { DatePipe, NgIf } from '@angular/common';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-crud-solicitud-soporte',
  standalone: true,
  imports: [MatPaginator,MatTable,DatePipe,MatLabel,MatFormField,MatOption,MatSelect,MatSelectModule,MatError,MatDatepicker,MatDatepickerToggle,MatDatepickerModule,
    MatInputModule,MatFormFieldModule,MatNativeDateModule,ReactiveFormsModule,NgIf,MatInput,MatPaginatorModule,MatTableModule,MatButtonModule,MatCheckboxModule,
    MatRadioModule],
  templateUrl: './crud-solicitud-soporte.component.html',
  styleUrl: './crud-solicitud-soporte.component.css'
})
export class CrudSolicitudSoporteComponent {
  form!: FormGroup;
  isEditMode: boolean = false;
  currentId!: string;
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
      cliente_id: ["", [Validators.required]],
      titulo: ["", [Validators.required, Validators.minLength(5)]],
      descripcion: ["", [Validators.required, Validators.minLength(5)]],
      producto: ["", [Validators.required]],
      fecha_solicitud: ["", [Validators.required]],
      estado: ['Pendiente', [Validators.required]],
    });
  }

  constructor(
    private soporteService: SoportejsonService,
    private fb: FormBuilder,
    private mydialog: MatDialog,
    private noti: MatDialog
  ) {}

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
    this.currentId = soporte.id??"1";

    this.form.setValue({
      cliente_id: soporte.cliente_id,
      titulo: soporte.titulo,
      descripcion: soporte.descripcion,
      producto: soporte.producto,
      fecha_solicitud: soporte.fecha_solicitud,
      estado: soporte.estado,
    });
  }

  // Guardar o actualizar soporte
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const newSoporte: Soporte = this.form.value;

    if (this.isEditMode) {
      newSoporte.id = this.currentId;

      const dialogRef = this.mydialog.open(DialogComponent, {
        data: {
          titulo: "Editar Soporte",
          contenido: "¿Desea guardar los cambios realizados en este soporte?"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === "Aceptar") {
          this.soporteService.updateSoporte(newSoporte).subscribe(() => {
            const notiRef = this.noti.open(NotificationComponent, {
              data: {
                titulo: "Confirmación",
                contenido: "Soporte actualizado exitosamente."
              }
            });
            this.clearForm();
            this.getSoportes();
          });
        }
      });
    } else {
      const dialogRef = this.mydialog.open(DialogComponent, {
        data: {
          titulo: "Agregar Soporte",
          contenido: "¿Desea guardar este nuevo soporte?"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === "Aceptar") {
          this.soporteService.addSoporte(newSoporte).subscribe(() => {
            const notiRef = this.noti.open(NotificationComponent, {
              data: {
                titulo: "Confirmación",
                contenido: "Soporte agregado exitosamente."
              }
            });
            this.clearForm();
            this.getSoportes();
          });
        }
      });
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
    this.currentId = '';
  }
}

