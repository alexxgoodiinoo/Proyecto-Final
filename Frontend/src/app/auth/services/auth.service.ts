import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseURL;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user); //Realiza una copia profunda
  }

  login(username: string, password: string): Observable<User | null> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/usuarios/${username}/${password}`)
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem('token', JSON.stringify(user)); //Guarda el token o los datos del usuario
        })
      );
  }

  register(usuario: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/usuarios`, usuario);
  }

  usernameExists(username: string, password: string): Observable<User | null> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/usuarios/${username}/${password}`)
      .pipe(
        map((user) => (user ? user : null)),
        catchError((error) => of(null))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    try {
      const user = JSON.parse(token);
      return of(!!user); // Si existe el usuario, está autenticado
    } catch (err) {
      return of(false); // Si no se puede parsear el token, significa que está corrupto o inválido
    }
  }
  
}
