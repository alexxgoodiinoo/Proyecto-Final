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
      .subscribe((partido) => (this.partidos = partido));

    this.mainService.getJugadores().subscribe((jugador) => {
      this.jugadores = jugador;
      this.ordenarJugadores();
      console.log(this.maxGoleadores);
      console.log(this.maxAsistentes);
    });
  }

  ordenarJugadores(){
    this.maxGoleadores = [...this.jugadores]
      .sort((a,b) => b.goles - a.goles);

    this.maxAsistentes = [...this.jugadores]
      .sort((a,b) => b.asistencias - a.asistencias);
  }

  verClasificacionCompleta(){
    this.router.navigate(['/main/clasificacion'])
  }

  verTablonPartidos(){
    this.router.navigate(['/main/partidos/info'])
  }

  verTablaGoleadores(){
    this.router.navigate(['/main/jugadores/tabla-goleadores'])
  }

  verTablaAsistentes(){
    this.router.navigate(['/main/jugadores/tabla-asistentes'])
  }
}