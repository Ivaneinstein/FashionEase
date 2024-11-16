import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fashion-ease-db-queries-840520918801.us-central1.run.app';

  constructor(private http: HttpClient) {}

  login(form: { correo: string; contraseña: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, form);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getOrdersByUser(id_usuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`, { params: { id_usuario } });
  }
}
