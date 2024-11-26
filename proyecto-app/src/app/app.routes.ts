import { Routes } from '@angular/router';
import { CrudGarantiasComponent } from './components/crud-garantias/crud-garantias.component';
import { CrudDevolucionesComponent } from './components/crud-devoluciones/crud-devoluciones.component';
import { IndexComponent } from './components/index/index.component';
import { CrudClientesComponent } from './components/crud-clientes/crud-clientes.component';
import { CrudSolicitudSoporteComponent } from './components/crud-solicitud-soporte/crud-solicitud-soporte.component';
import { CrudProductosComponent } from './components/crud-productos/crud-productos.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';

export const routes: Routes = [

    {path:"crud-garantias", component:CrudGarantiasComponent},
    {path: "crud-devoluciones", component:CrudDevolucionesComponent},
    {path: "crud-clientes", component:CrudClientesComponent},
    {path: "crud-solicitud", component:CrudSolicitudSoporteComponent},
    {path: "crud-producto", component:CrudProductosComponent},
    {path:"producto", component:ListaProductosComponent},
    {path: "inicio", component:IndexComponent},

     //rutas por defecto
     { path: '', redirectTo: '/inicio', pathMatch: 'full' },
     {path:"**", redirectTo:"/inicio"}, //**  Representa cualquier otra ruta
];
