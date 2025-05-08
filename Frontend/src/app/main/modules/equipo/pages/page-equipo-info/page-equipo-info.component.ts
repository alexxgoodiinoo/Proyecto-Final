import { Component } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Equipo } from '../../../../interfaces/equipo.interface';

@Component({
  selector: 'app-page-equipo-info',
  standalone: false,
  templateUrl: './page-equipo-info.component.html',
})
export class PageEquipoInfoComponent {
  tipoUsuario: string | null = null;
  public equipos: Equipo[] = [];
  public filtroNombre: string = '';

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  get equiposFiltrados(): Equipo[] {
    return this.equipos.filter((equipo) =>
      equipo.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
}