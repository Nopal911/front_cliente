import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseURL = 'http://localhost:3000/carrito';

  constructor(private http: HttpClient) { }

  getCarritoDetalle(email: string) {
    return this.http.get<any>(`${this.baseURL}/carritolist/${email}`);
  }

  getCarrito(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  addCarrito(carrito: Carrito): Observable<any> {
    return this.http.post(`${this.baseURL}`, carrito);
  }

  updateCarrito(carrito: Carrito): Observable<any> {
    return this.http.put(`${this.baseURL}/${carrito.id}`, carrito);
  }  

  deleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // Nuevo método para limpiar todo el carrito de un usuario
  clearCarrito(email: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/clear/${email}`);
  }
}