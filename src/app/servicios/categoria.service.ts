import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseURL = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  addCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.baseURL}`, categoria);
  }

  updateCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(`${this.baseURL}`, categoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
