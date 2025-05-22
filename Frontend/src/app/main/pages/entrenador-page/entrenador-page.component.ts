import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Jugador } from '../../interfaces/jugador.interface';

interface PosicionCampo {
  id: string;
  posX: number;
  posY: number;
  jugador?: Jugador;
  posicion: string;
}

@Component({
  selector: 'app-entrenador-page',
  standalone: false,
  templateUrl: './entrenador-page.component.html',
  styles: ``,
})
export class EntrenadorPageComponent implements OnInit {
  tipoUsuario: string | null = null;
  equipoUsuario: boolean = false;
  idEquipo: string | null = null;

  jugadores: PosicionCampo[] = [];
  jugadoresSuplentes: Jugador[] = [];
  jugadoresCompatibles: Jugador[] = [];

  posicionSeleccionada: { linea: string; id: string } | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
      this.equipoUsuario = user.data.id_equipo;
    }

    this.cargarUsuario();
    this.mainService.getEquipos().subscribe((equipos) => {
      const equipoUsuario = equipos.find(
        (e) => e.id.toString() === this.idEquipo
      );
      if (equipoUsuario) {
        this.cargarJugadores();
      } else {
        this.jugadores = [];
      }
    });
  }

  cargarUsuario(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
      this.idEquipo = user.data.id_equipo;
    }
  }

  cargarJugadores(): void {
    this.mainService.getJugadores().subscribe((resp) => {
      const jugadoresEquipo = resp.filter(
        (j) => j.id_equipo?.toString() === this.idEquipo
      );
      const titulares = jugadoresEquipo.filter((j) => j.once_inicial);
      this.jugadoresSuplentes = jugadoresEquipo.filter((j) => !j.once_inicial);
      this.jugadores = this.mapearPosiciones(titulares);
    });
  }

  mapearPosiciones(jugadores: Jugador[]): PosicionCampo[] {
    const estructura = {
      portero: { cantidad: 1, codigo: 'PT', y: 10 },
      defensa: { cantidad: 4, codigo: 'DF', y: 30 },
      medio: { cantidad: 3, codigo: 'MC', y: 55 },
      delantero: { cantidad: 3, codigo: 'DL', y: 80 },
    };

    const resultado: PosicionCampo[] = [];

    for (const [linea, { cantidad, codigo, y }] of Object.entries(estructura)) {
      const jugadoresLinea = jugadores.filter((j) => j.posicion === codigo);
      for (let i = 0; i < cantidad; i++) {
        resultado.push({
          id: `${linea}-${i}`,
          posicion: linea,
          posX: (100 / (cantidad + 1)) * (i + 1),
          posY: y,
          jugador: jugadoresLinea[i],
        });
      }
    }

    return resultado;
  }

  abrirSeleccion(posicion: string, id: string): void {
    const codigoPos = this.obtenerCodigoPosicion(posicion);
    this.posicionSeleccionada = { linea: posicion, id };
    this.jugadoresCompatibles = this.jugadoresSuplentes.filter(
      (j) => j.posicion === codigoPos
    );
  }

  cerrarSeleccion(): void {
    this.posicionSeleccionada = null;
    this.jugadoresCompatibles = [];
  }

  asignarASlot(jugador: Jugador): void {
    const seleccion = this.posicionSeleccionada;
    if (
      !seleccion ||
      jugador.posicion !== this.obtenerCodigoPosicion(seleccion.linea)
    )
      return;

    jugador.once_inicial = true;
    this.mainService.updateJugador(jugador.id, jugador).subscribe(() => {
      const idx = this.jugadores.findIndex((p) => p.id === seleccion.id);
      if (idx !== -1) this.jugadores[idx].jugador = jugador;

      this.jugadoresSuplentes = this.jugadoresSuplentes.filter(
        (j) => j.id !== jugador.id
      );
      this.cerrarSeleccion();
    });
  }

  mandarAlBanquillo(jugador: Jugador, posicionId: string): void {
    jugador.once_inicial = false;
    this.mainService.updateJugador(jugador.id, jugador).subscribe(() => {
      const idx = this.jugadores.findIndex((p) => p.id === posicionId);
      if (idx !== -1) this.jugadores[idx].jugador = undefined;

      this.jugadoresSuplentes = [
        ...this.jugadoresSuplentes.filter((j) => j.id !== jugador.id),
        jugador,
      ];
    });
  }

  obtenerCodigoPosicion(pos: string): string {
    const mapa: { [key: string]: string } = {
      portero: 'PT',
      defensa: 'DF',
      medio: 'MC',
      delantero: 'DL',
    };
    return mapa[pos] || '';
  }
}
