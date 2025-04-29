import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    try {
      let tipoUsuario: string | null = null;

      const token = localStorage.getItem('token');

      if (token) {
        const user = JSON.parse(token);
        tipoUsuario = user.data.tipo_usuario;
      }

      if (tipoUsuario === 'admin') {
        return true;
      }
    } catch (err) {
      console.log('Error procesando el token');
    }
    this.router.navigate(['/main']);
    return false;
  }
}