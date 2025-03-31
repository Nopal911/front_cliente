import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenService {
  private apiUrl = 'http://localhost:3000/detalleorden'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) {}

  getDetallesOrden(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  agregarDetalleOrden(detalle: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, detalle);
  }

  actualizarDetalleOrden(id: number, detalle: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, detalle);
  }

  eliminarDetalleOrden(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
