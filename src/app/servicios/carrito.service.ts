import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito';  // Asegúrate de tener una interfaz Carrito

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseURL = 'http://localhost:3000/carrito';  // URL correcta del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los productos en el carrito
  getCarrito(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  // Agregar un producto al carrito
  addCarrito(carrito: Carrito): Observable<any> {
    return this.http.post(`${this.baseURL}`, carrito);
  }

  // Actualizar un producto en el carrito
  updateCarrito(carrito: Carrito): Observable<any> {
    return this.http.put(`${this.baseURL}/${carrito.id}`, carrito);
  }  
  
  // Eliminar un producto del carrito por ID
  deleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
