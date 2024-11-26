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

  getClientesSearch(id?:number):Observable<Clientes[]>{
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

  updateCliente(cliente: Clientes):Observable<Clientes> {
    const urlDelCliente = `${this.jsonUrl}/${cliente.id}`
    return this.http.put<Clientes>(urlDelCliente, cliente);
  }

  deleteCliente(cliente: Clientes):Observable<void> {
    const urlDelCliente = `${this.jsonUrl}/${cliente.id}`
    return this.http.delete<void>(urlDelCliente);
  }
}
