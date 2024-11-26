import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Soporte } from '../models/SolicitudesSoporte';

@Injectable({
  providedIn: 'root'
})
export class SoportejsonService {
  private jsonUrl = 'http://localhost:4200/soporte'; // Ruta del JSON

  constructor(private http: HttpClient) { }

  // OBTENER REGISTROS
  getSoportes(): Observable<Soporte[]> {
    return this.http.get<Soporte[]>(this.jsonUrl);
  }

  // BUSCAR REGISTROS (por cliente_id, estado, o ambos)
  getSoporteSearch(cliente_id?: string, estado?: string): Observable<Soporte[]> {
    return this.http.get<Soporte[]>(this.jsonUrl).pipe(
      map((soportes) =>
        soportes.filter((soporte) =>
          (cliente_id ? soporte.cliente_id.toLowerCase().includes(cliente_id.toLowerCase()) : true) &&
          (estado ? soporte.estado.toLowerCase().includes(estado.toLowerCase()) : true)
        )
      )
    );
  }

  // CREAR UN NUEVO REGISTRO
  addSoporte(soporte: Soporte): Observable<Soporte> {
    return this.http.post<Soporte>(this.jsonUrl, soporte);
  }

  // MODIFICAR UN REGISTRO
  updateSoporte(soporte: Soporte): Observable<Soporte> {
    const urlDelSoporte = `${this.jsonUrl}/${soporte.id}`;
    return this.http.put<Soporte>(urlDelSoporte, soporte);
  }

  // ELIMINAR UN REGISTRO
  deleteSoporte(soporte: Soporte): Observable<void> {
    const urlDelSoporte = `${this.jsonUrl}/${soporte.id}`;
    return this.http.delete<void>(urlDelSoporte);
  }
}
