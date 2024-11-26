export interface Devolucion {
  id?: number; // Opcional para nuevas solicitudes
  cliente: string;
  producto: string;
  cantidad: string;
  descripcion: string;
  fechaSolicitud: Date;
  estado: string; 
  prioridad: boolean;
}
