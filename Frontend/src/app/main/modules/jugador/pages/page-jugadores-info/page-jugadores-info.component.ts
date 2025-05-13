import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../../interfaces/jugador.interface';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'app-page-jugadores-info',
  standalone: false,
  templateUrl: './page-jugadores-info.component.html',
})
export class PageJugadoresInfoComponent implements OnInit {
  tipoUsuario: string | null = null;
  public jugadores: Jugador[] = [];
  public filtroNombre: string = '';
  posiciones = [
    { clave: null, label: 'Todos' },
    { clave: 'PT', label: 'Portero' },
    { clave: 'DF', label: 'Defensa' },
    { clave: 'MC', label: 'Mediocentro' },
    { clave: 'DL', label: 'Delantero' }];
  filtroPosicion: string | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService
      .getJugadores()
      .subscribe((jugadores) => (this.jugadores = jugadores));
  }

  get jugadoresFiltrados(): Jugador[] {
    return this.jugadores.filter(
      (jugador) =>
        (this.filtroPosicion
          ? jugador.posicion === this.filtroPosicion
          : true) &&
        (jugador.nombre
          .toLowerCase()
          .includes(this.filtroNombre.toLowerCase()) ||
          jugador.apellidos
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase()) ||
          jugador.nombre_equipo
            ?.toLowerCase()
            .includes(this.filtroNombre.toLowerCase()))
    );
  }
}
