export interface Devolucion {
    id?: number; // Opcional para nuevas solicitudes
    cliente: string;
    producto: string;
    descripcion: string;
    fechaSolicitud: Date;
    estado: string; // Estados como: "pendiente", "en proceso", "completado"
  }
  