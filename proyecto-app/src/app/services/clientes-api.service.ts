import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesApiService {
  private apiwebUrl= "http://localhost:5248/api/Clientes";

  constructor(private http:HttpClient) { }
  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.apiwebUrl);
  }

  getClientesSearch(id?:number):Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.apiwebUrl).pipe(
      map((clientes)=>
        clientes.filter((cliente)=>
          clientes.filter((cliente) => (id ? cliente.id === id :true))
       )
      )
    );
  }
  addCliente(cliente: Clientes):Observable<Clientes> {
    const { id, ...clienteSinId } = cliente;  
    return this.http.post<Clientes>(this.apiwebUrl, clienteSinId);
  }

  updateCliente(cliente: Clientes):Observable<Clientes> {
    const urlDelCliente = `${this.apiwebUrl}/${cliente.id}`
    return this.http.put<Clientes>(urlDelCliente, cliente);
  }

  deleteCliente(cliente: Clientes):Observable<void> {
    const urlDelCliente = `${this.apiwebUrl}/${cliente.id}`
    return this.http.delete<void>(urlDelCliente);
  }
}
