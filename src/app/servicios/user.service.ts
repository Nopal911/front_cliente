import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000/usuario';  // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  // Agregar un nuevo usuario
  addUsuario(user: Usuario): Observable<any> {
    return this.http.post(`${this.baseURL}`, user);
  }

// Actualizar usuario
updateUsuario(user: Usuario): Observable<any> {
    return this.http.put(`${this.baseURL}`, user);  // Enviar el usuario en el body
  }
  
  // Eliminar usuario por email
deleteUsuario(email: string): Observable<any> {
    return this.http.delete(`${this.baseURL}`, { body: { email } });
  }
  
  
}
