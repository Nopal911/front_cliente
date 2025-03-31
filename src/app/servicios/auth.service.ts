import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  registroUsuario(usuario: User) {
    console.log(usuario);
    return this.http.post(`${this.baseURL}/usuario`, usuario);
  }

  getUserByEmail(usuario: User): Observable<Mensaje> {
    
    /* hoy comente todo estoconst path = `${this.baseURL}/usuario/email`
    console.log(path);
    return this.http.post<Mensaje>(path, usuario);*/

    return this.http.post<Mensaje>(`${this.baseURL}/usuario/email`, usuario);
  }
}
