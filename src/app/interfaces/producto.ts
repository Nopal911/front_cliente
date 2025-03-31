export interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria_id: number;
  ranking: number;
  color: string;
  talla: string;
  //imagen_url: string[]; // array de URLs de imágenes
  imagenes: string[];
}