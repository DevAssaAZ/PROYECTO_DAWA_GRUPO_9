import { Routes } from '@angular/router';
import { CrudGarantiasComponent } from './components/crud-garantias/crud-garantias.component';
import { CrudDevolucionesComponent } from './components/crud-devoluciones/crud-devoluciones.component';
import { IndexComponent } from './components/index/index.component';
import { CrudClientesComponent } from './components/crud-clientes/crud-clientes.component';

export const routes: Routes = [

    {path:"crud-garantias", component:CrudGarantiasComponent},
    {path: "crud-devoluciones", component:CrudDevolucionesComponent},
    {path: "crud-clientes", component:CrudClientesComponent},
    {path: "inicio", component:IndexComponent},

     //rutas por defecto
     { path: '', redirectTo: '/inicio', pathMatch: 'full' },
     {path:"**", redirectTo:"/inicio"}, //**  Representa cualquier otra ruta
];
