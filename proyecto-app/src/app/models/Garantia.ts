export interface Garantia{
    
    //propiedades
    id?:number; // El id es opcional por que al crear una nueva pelicula no lo tenemos aun
    cliente_id: number;
    producto:string;
    numeroFactura:string;
    fechaCompra:string;
    descripcion:string;
    estado:string;
    fechaRegistro:string;
    ultimaActualizacion:string;
  
}
