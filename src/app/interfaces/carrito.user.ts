export interface CarritoUser {
    id?: number;                 // ID del carrito (auto incrementable, opcional al agregar)
    color: string;       // Correo electrónico del usuario (clave foránea de la tabla tbl_usuario)
    cantidad: number;            // Cantidad del producto en el carrito
    nombre: string;
    precio: number;
    talla: string;
  }