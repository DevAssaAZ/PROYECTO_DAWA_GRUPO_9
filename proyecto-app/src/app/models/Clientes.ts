import { Garantia } from "./Garantia";
import { Soporte } from "./SolicitudesSoporte";

export interface Clientes{
  id? : number;                
  nombre: string;            
  email: string;              
  telefono: string;           
  direccion: string;          
  fechaRegistro: string;     
  estado: string; 
  garantia?:Garantia;
  soporte?: Soporte;    
}