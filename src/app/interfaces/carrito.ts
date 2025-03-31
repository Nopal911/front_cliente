export interface Carrito {
  id?: number;                 // ID del carrito (auto incrementable, opcional al agregar)
  usuario_email: string;       // Correo electrónico del usuario (clave foránea de la tabla tbl_usuario)
  producto_id?: number;         // ID del producto (clave foránea de la tabla tbl_producto)
  cantidad: number;            // Cantidad del producto en el carrito
}