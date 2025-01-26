import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {

  private apiwebUrl="http://localhost:5248/api/Productoes";
    constructor(private http:HttpClient) { //Inyeccion de httpClient
  
  
    }
  
    getProductos():Observable<Producto[]>{
      return this.http.get<Producto[]>(this.apiwebUrl);
    }
  
    //BUSCAR
    getProductoSearch(nombre?:string, categoria?:string):Observable<Producto[]>{
      return this.http.get<Producto[]>(this.apiwebUrl).pipe(
        map((producto)=>
          producto.filter((producto)=>
            (nombre? producto.nombre.toLowerCase().includes(nombre.toLowerCase()):true ) &&
            (categoria? producto.categoria.toLowerCase().includes(categoria.toLowerCase()):true )
          )
        )
      );
    }
  
    //CREAR
    addProductos(producto: Producto): Observable<Producto> {
      const { id, ...productoSinId } = producto;  // Crea una copia sin el campo `id`
      return this.http.post<Producto>(this.apiwebUrl, productoSinId);
    }
  
    //MODIFICAR
    updateProducto(producto:Producto):Observable<Producto>{
      const urlDelProducto = `${this.apiwebUrl}/${producto.id}`
      return this.http.put<Producto>(urlDelProducto, producto);
    }
  
    //ELIMINAR
    deleteProducto(producto:Producto):Observable<void>{
      const urlDelProducto = `${this.apiwebUrl}/${producto.id}`
      return this.http.delete<void>(urlDelProducto);
    }
}
