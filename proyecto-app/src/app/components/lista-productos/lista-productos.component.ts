import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Producto } from '../../models/Producto';
import { ProductosjsonService } from '../../services/productosjson.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  title = 'Productos';
  producto:Producto[]=[];
  constructor(private miServicio:ProductosjsonService, private mydialog: MatDialog){
    
  }

  ngOnInit():void{//Funcion propia de angular que se ejecuta automaticamente cuando se crea
    // el componente 
    this.getProductos();

  }


  //Cargar el arreglo de productos con los datos que me devuelve el servicio
  getProductos():void{
    this.miServicio.getProductos().subscribe((data:Producto[])=>{
      this.producto = data;
      console.log(this.producto[0]);
    });
  }

  comprar(producto:Producto):void{
    const dialogRef = this.mydialog.open(DialogComponent,{
      data:{
        titulo:producto.nombre,
        contenido: 'El producto' + producto.nombre + " ha sido comprado"
      }
    }); //Abrir la ventana
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="Aceptar"){
        console.log("Aceptar");
      }else if(result==="Cancelar"){
        console.error("cancelar");
      }
    })
  }

  activar(imgProducto:HTMLImageElement){
    imgProducto.classList.add("activa");
  }

  desactivar(imgProducto:HTMLImageElement){
    imgProducto.classList.remove("activa");
  }
}
