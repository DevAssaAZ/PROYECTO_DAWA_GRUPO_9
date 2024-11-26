import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesjsonService {
  private jsonUrl= "http://localhost:3000/clientes";

  constructor(private http:HttpClient) { }
  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.jsonUrl);
  }

  getClientesSearch(id:number):Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.jsonUrl).pipe(
      map((clientes)=>
        clientes.filter((cliente)=>
          clientes.filter((cliente) => (id ? cliente.id === id :true))
       )
      )
    );
  }
  addCliente(cliente: Clientes):Observable<Clientes> {
    return this.http.post<Clientes>(this.jsonUrl, cliente);
  }
}
