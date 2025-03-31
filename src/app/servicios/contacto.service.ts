import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { Contacto } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private baseURL = 'http://localhost:3000/contacto';

  constructor(private http: HttpClient) {}

  getContacto(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  addContacto(contacto: Contacto): Observable<any> {
    return this.http.post(`${this.baseURL}`, contacto);
  }

  updateContacto(contacto: Contacto): Observable<any> {
    return this.http.put(`${this.baseURL}`, contacto);
  }

  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
