import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Garantia } from '../models/Garantia';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarantiasjsonService {
  private jsonUrl="http://localhost:3000/garantias";
  constructor(private http:HttpClient) { //Inyeccion de httpClient


  }

  getGarantias():Observable<Garantia[]>{//obtener la lista de peliculas desde el archivo
    return this.http.get<Garantia[]>(this.jsonUrl);
  }

  //BUSCAR
  getGarantiaSearch(numeroFactura?:string, estado?:string):Observable<Garantia[]>{
    return this.http.get<Garantia[]>(this.jsonUrl).pipe(
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
    return this.http.post<Garantia>(this.jsonUrl, garantia);
  }

  //MODIFICAR
  updateGarantia(garantia:Garantia):Observable<Garantia>{
    const urlDeLaGarantia = `${this.jsonUrl}/${garantia.id}`
    return this.http.put<Garantia>(urlDeLaGarantia, garantia);
  }

  //ELIMINAR
  deleteGarantia(garantia:Garantia):Observable<void>{
    const urlDeLaGarantia = `${this.jsonUrl}/${garantia.id}`
    return this.http.delete<void>(urlDeLaGarantia);
  }
}
