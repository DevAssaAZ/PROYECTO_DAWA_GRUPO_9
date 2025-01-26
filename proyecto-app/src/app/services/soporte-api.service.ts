import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Soporte } from '../models/SolicitudesSoporte';

@Injectable({
  providedIn: 'root'
})
export class SoporteApiService {
  private apiUrl="http://localhost:5248/api/Devoluciones";
  constructor(private http:HttpClient) {

   }

  getSoportes():Observable<Soporte[]>{ //obtener la lista de peliculas desde el archivo
      return this.http.get<Soporte[]>(this.apiUrl);
    }
  // BUSCAR REGISTROS (por cliente_id, estado, o ambos)
    getSoporteSearch(cliente_id?: string, estado?: string): Observable<Soporte[]> {
      return this.http.get<Soporte[]>(this.apiUrl).pipe(
        map((soportes) =>
          soportes.filter((soporte) =>
            (cliente_id ? soporte.cliente_id.toLowerCase().includes(cliente_id.toLowerCase()) : true) &&
            (estado ? soporte.estado.toLowerCase().includes(estado.toLowerCase()) : true)
          )
        )
      );
    }

    addSoporte(soporte: Soporte): Observable<Soporte> {
        return this.http.post<Soporte>(this.apiUrl, soporte);
      }
    
    updateSoporte(soporte: Soporte): Observable<Soporte> {
        const urlDelSoporte = `${this.apiUrl}/${soporte.id}`;
        return this.http.put<Soporte>(urlDelSoporte, soporte);
      }
    
    deleteMovie(soporte : Soporte):Observable<void>{
        const urlDelSoporte = `${this.apiUrl}/${soporte.id}`;
        return this.http.delete<void>(urlDelSoporte);
      }
}
