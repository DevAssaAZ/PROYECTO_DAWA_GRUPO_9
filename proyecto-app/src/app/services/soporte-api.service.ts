import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Soporte } from '../models/SolicitudesSoporte';

@Injectable({
  providedIn: 'root'
})
export class SoporteApiService {
  private apiUrl="http://localhost:5248/api/Soportes";
  constructor(private http:HttpClient) {

   }

  getSoportes():Observable<Soporte[]>{ //obtener la lista de peliculas desde el archivo
      return this.http.get<Soporte[]>(this.apiUrl);
    }
  // BUSCAR REGISTROS (por cliente_id)
    getSoporteSearch(cliente_id?: string): Observable<Soporte[]> {
      return this.http.get<Soporte[]>(this.apiUrl).pipe(
        map((soportes) =>
          soportes.filter((soporte) =>
            (cliente_id ? soporte.cliente_id === cliente_id : true)
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
    
    deleteSoporte(soporte : Soporte):Observable<void>{
        const urlDelSoporte = `${this.apiUrl}/${soporte.id}`;
        return this.http.delete<void>(urlDelSoporte);
      }
}
