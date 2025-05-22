import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { Equipo } from '../../interfaces/equipo.interface';

type JugadorConPos = Jugador & {
  posX: number;
  posY: number;
};

@Component({
  selector: 'app-entrenador-page',
  standalone: false,
  templateUrl: './entrenador-page.component.html',
  styles: ``,
})
export class EntrenadorPageComponent implements OnInit {
  constructor(private mainService: MainService) {}

  tipoUsuario: string | null = null;
  idEquipo: string | null = null;

  jugadores: JugadorConPos[] = [];
  equipos: Equipo[] = [];

  equipoUsuario: Equipo | null = null;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
      this.idEquipo = user.data.id_equipo;
    }

    this.mainService.getEquipos().subscribe((equipos) => {
      this.equipos = equipos;
      this.equipoUsuario =
        this.equipos.find((e) => e.id.toString() === this.idEquipo) || null;

      if (this.equipoUsuario) {
        this.mainService.getJugadores().subscribe({
          next: (resp) => {
            // Solo jugadores del equipo del entrenador
            const jugadoresEquipo = resp.filter(
              (j) => j.id_equipo?.toString() === this.idEquipo
            );
            this.jugadores = this.mapearPosiciones(jugadoresEquipo);
          },
          error: (err) => console.error(err),
        });
      } else {
        this.jugadores = [];
      }
    });
  }

  mapearPosiciones(jugadores: Jugador[]): JugadorConPos[] {
    const posicionesY = {
      portero: 10,
      defensa: 30,
      medio: 55,
      delantero: 80,
    };

    const agrupados = {
      portero: jugadores.filter((j) => j.posicion === 'PT'),
      defensa: jugadores.filter((j) => j.posicion === 'DF'),
      medio: jugadores.filter((j) => j.posicion === 'MC'),
      delantero: jugadores.filter((j) => j.posicion === 'DL'),
    };

    const jugadoresConPos: JugadorConPos[] = [];

    Object.entries(agrupados).forEach(([tipo, lista]) => {
      const cantidad = lista.length;
      lista.forEach((jugador, index) => {
        const posX = (100 / (cantidad + 1)) * (index + 1);
        const posY = posicionesY[tipo as keyof typeof posicionesY];
        jugadoresConPos.push({ ...jugador, posX, posY });
      });
    });

    return jugadoresConPos;
  }
}
