import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
  }
  constructor(private clienteService:ClientesjsonService, private fb: FormBuilder){
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
  onSubmit(){

  }

}
