import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Garantia } from '../models/Garantia';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarantiasApiService {

  private apiwebUrl="http://localhost:5248/api/Garantias";
  constructor(private http:HttpClient) { //Inyeccion de httpClient


  }

  getGarantias():Observable<Garantia[]>{//obtener la lista de peliculas desde el archivo
    return this.http.get<Garantia[]>(this.apiwebUrl);
  }

  //BUSCAR
  getGarantiaSearch(numeroFactura?:string, estado?:string):Observable<Garantia[]>{
    return this.http.get<Garantia[]>(this.apiwebUrl).pipe(
      map((garantia)=>
        garantia.filter((garantia)=>
          (numeroFactura? garantia.numeroFactura.toLowerCase().includes(numeroFactura.toLowerCase()):true ) &&
          (estado? garantia.estado.toLowerCase().includes(estado.toLowerCase()):true )
        )
      )
    );
  }

  //CREAR
  addGarantia(garantia:Garantia):Observable<Garantia>{
    const { id, ...garantiaSinId } = garantia;  
    return this.http.post<Garantia>(this.apiwebUrl, garantiaSinId);
  }

  //MODIFICAR
  updateGarantia(garantia:Garantia):Observable<Garantia>{
    const urlDeLaGarantia = `${this.apiwebUrl}/${garantia.id}`
    return this.http.put<Garantia>(urlDeLaGarantia, garantia);
  }

  //ELIMINAR
  deleteGarantia(garantia:Garantia):Observable<void>{
    const urlDeLaGarantia = `${this.apiwebUrl}/${garantia.id}`
    return this.http.delete<void>(urlDeLaGarantia);
  }
}
