import { Routes } from '@angular/router';
import { CrudGarantiasComponent } from './components/crud-garantias/crud-garantias.component';
import { CrudDevolucionesComponent } from './components/crud-devoluciones/crud-devoluciones.component';

export const routes: Routes = [

    {path:"crud-garantias", component:CrudGarantiasComponent},
    {path: "crud-devoluciones", component:CrudDevolucionesComponent},

     //rutas por defecto
     { path: '', redirectTo: '/crud-garantias', pathMatch: 'full' },
     {path:"**", redirectTo:"/crud-garantias"}, //**  Representa cualquier otra ruta
];
