import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Devolucion } from '../models/Devolucion';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesApiService {
  private apiUrl="http://localhost:5248/api/Devoluciones";
  constructor(private http:HttpClient) { 

  }

  getDevoluciones():Observable<Devolucion[]>{ //obtener la lista de peliculas desde el archivo
    return this.http.get<Devolucion[]>(this.apiUrl);
  }


  getDevolucionSearch(cliente?: string): Observable<Devolucion[]> {
    return this.http.get<Devolucion[]>(this.apiUrl).pipe(
      map((devoluciones) =>
        devoluciones.filter((devolucion) =>
          (cliente ? devolucion.cliente && devolucion.cliente.toLowerCase().includes(cliente.toLowerCase()) : true)
        )
      )
    );
  }
  

  addDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    return this.http.post<Devolucion>(this.apiUrl, devolucion);
  }

  updateDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    const urlDeLaDevolucion = `${this.apiUrl}/${devolucion.id}`;
    return this.http.put<Devolucion>(urlDeLaDevolucion, devolucion);
  }

  deleteMovie(devolucion: Devolucion):Observable<void>{
    const urlDeLaDevolucion = `${this.apiUrl}/${devolucion.id}`;
    return this.http.delete<void>(urlDeLaDevolucion);
  }

}
