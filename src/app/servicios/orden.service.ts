import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../interfaces/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = 'http://localhost:3000/ordenes';

  constructor(private http: HttpClient) { }

  // Obtener todas las órdenes
  getOrdenes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Agregar una nueva orden
  addOrden(orden: Orden): Observable<any> {
    return this.http.post<any>(this.apiUrl, orden);
  }

  // ✅ CORRECCIÓN: Ahora solo recibe un objeto orden y extrae su id
  updateOrden(orden: Orden): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orden.id}`, orden);
  }

  // Eliminar una orden
  deleteOrden(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
