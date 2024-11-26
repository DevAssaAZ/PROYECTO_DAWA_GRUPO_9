import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Devolucion } from '../models/Devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesjsonService {
  private jsonUrl="http://localhost:3000/devoluciones";   //ruta del archivo
  constructor(private http:HttpClient) {  //inyeccion de httpClient

  }

  getDevoluciones():Observable<Devolucion[]>{ //obtener la lista de peliculas desde el archivo
    return this.http.get<Devolucion[]>(this.jsonUrl);
  }


  getDevolucionSearch(cliente?:string):Observable<Devolucion[]>{
    return this.http.get<Devolucion[]>(this.jsonUrl).pipe(
        map((devoluciones)=>
        devoluciones.filter((devolucion)=>
        (cliente ? devolucion.cliente.toLowerCase().includes(cliente.toLowerCase()):true)
        )
      )
    );
  }

  addDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    return this.http.post<Devolucion>(this.jsonUrl, devolucion);
  }

  updateDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    const urlDeLaDevolucion = `${this.jsonUrl}/${devolucion.id}`;
    return this.http.put<Devolucion>(urlDeLaDevolucion, devolucion);
  }

  deleteMovie(devolucion: Devolucion):Observable<void>{
    const urlDeLaDevolucion = `${this.jsonUrl}/${devolucion.id}`;
    return this.http.delete<void>(urlDeLaDevolucion);
  }
}
