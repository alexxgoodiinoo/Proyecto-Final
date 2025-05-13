import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../interfaces/equipo.interface';
import { MainService } from '../../services/main.service';
import { Partido } from '../../interfaces/partido.interface';
import { Jugador } from '../../interfaces/jugador.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.component.html',
  styles: ``,
})
export class MainPageComponent implements OnInit {
  tipoUsuario: string | null = null;
  public equipos: Equipo[] = [];
  public partidos: Partido[] = [];
  public jugadores: Jugador[] = [];

  public maxGoleadores: Jugador[] = [];
  public maxAsistentes: Jugador[] = [];

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService
      .getEquipos()
      .subscribe((equipo) => (this.equipos = equipo));

    this.mainService
      .getPartidos()
      .subscribe(
        (partidos) => (this.partidos = this.partidosOrdenados(partidos))
      );

    this.mainService.getJugadores().subscribe((jugador) => {
      this.jugadores = jugador;
      this.ordenarJugadores();
    });
  }

  ordenarJugadores() {
    this.maxGoleadores = [...this.jugadores]
      .sort((a, b) => b.goles - a.goles)
      .slice(0, 3);

    this.maxAsistentes = [...this.jugadores]
      .sort((a, b) => b.asistencias - a.asistencias)
      .slice(0, 3);
  }

  partidosOrdenados(partidos: Partido[]): Partido[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return partidos
      .filter((partido) => {
        if (!partido.fecha) return;
        const fechaPartido = new Date(partido.fecha);
        return fechaPartido >= hoy;
      })
      .sort((a, b) =>
        a.fecha && b.fecha
          ? new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
          : 0
      )
      .slice(0, 3);
  }

  verClasificacionCompleta() {
    this.router.navigate(['/main/clasificacion']);
  }

  verTablonPartidos() {
    this.router.navigate(['/main/partidos/info']);
  }

  verTablaGoleadores() {
    this.router.navigate(['/main/jugadores/tabla-goleadores']);
  }

  verTablaAsistentes() {
    this.router.navigate(['/main/jugadores/tabla-asistentes']);
  }
}
