type Estado = "pendiente" | "pagado" | "enviado" | "entregado";

export interface Orden {
    id?: number;             
    usuario_email: string;  
    fecha?: string;           
    total: number;          
    //estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado'; 
    estado: Estado
  }
  