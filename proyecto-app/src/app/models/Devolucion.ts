export interface Devolucion {
  id: number; // Opcional para nuevas solicitudes
  cliente: string; 
  producto: string; 
  cantidad: number; 
  descripcion: string; 
  fechaSolicitud: string;
  estado: string; 
  prioridad?: boolean; 
}
