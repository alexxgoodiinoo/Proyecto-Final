import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../interfaces/equipo.interface';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clasificacion-page',
  standalone: false,
  templateUrl: './clasificacion-page.component.html',
  styles: ``,
})
export class ClasificacionPageComponent implements OnInit {
  public equipos: Equipo[] = [];

  tipoUsuario: string | null = null;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  detalleEquipo(uuid: string) {
    this.router.navigate(['/main/equipos', uuid]);
  }
}