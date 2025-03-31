import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';  // Asegúrate de tener la interfaz Producto

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseURL = 'http://localhost:3000/productos';  // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) { }

  getProductosPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseURL}?categoria_id=${categoriaId}`);
  }  

  obtenerProductos(): Observable<any> {
    return this.http.get<any>(this.baseURL);
  }

  agregarProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(this.baseURL, producto);
  }
  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  // Agregar un nuevo producto
  addProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.baseURL}`, producto);
  }

  // Actualizar producto
  updateProducto(producto: FormData): Observable<any> {
    return this.http.put(`${this.baseURL}`, producto);
  }
  

  // Eliminar un producto por ID
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
