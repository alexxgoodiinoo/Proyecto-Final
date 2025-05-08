import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../../interfaces/jugador.interface';
import { MainService } from '../../../../services/main.service';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-jugador',
  standalone: false,
  templateUrl: './table-jugador.component.html',
})
export class TableJugadorComponent implements OnInit {
  public jugadores: Jugador[] = [];
  public equipos: Equipo[] = [];
  public filtroNombre: string = '';

  editandoJugadorId: string | null = null;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.cargarJugadores();
    this.mainService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  cargarJugadores() {
    this.mainService
      .getJugadores()
      .subscribe((jugador) => (this.jugadores = jugador));
  }

  get jugadoresFiltrados(): Jugador[] {
    return this.jugadores.filter(
      (jugador) =>
        jugador.nombre
          .toLowerCase()
          .includes(this.filtroNombre.toLowerCase()) ||
        jugador.apellidos
          .toLowerCase()
          .includes(this.filtroNombre.toLowerCase()) ||
        jugador.posicion
          ?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase()) ||
        jugador.nombre_equipo
          ?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase())
    );
  }

  onEditJugador(uuid: string) {
    this.editandoJugadorId = uuid;
  }

  onGuardarJugador(jugador: Jugador) {
    if (!jugador.id) return;
    this.mainService.updateJugador(jugador.id, jugador).subscribe({
      next: () => {
        console.log('Jugador actualizado con éxito');
        this.editandoJugadorId = null;
        this.cargarJugadores();
      },
      error: (err) => {
        console.error('Error al actualizar el jugador', err);
      },
    });
  }

  onCancelarEdicionJugador() {
    this.editandoJugadorId = null;
    this.cargarJugadores();
  }

  onDeleteJugador(uuid: string) {
    this.mainService.deleteJugador(uuid).subscribe({
      next: () => {
        this.jugadores = this.jugadores.filter((e) => e.id !== uuid);
      },
      error: (err) => {
        console.log('Error al eliminar jugador ', err);
      },
    });
  }

  detalleJugador(uuid: string) {
    this.router.navigate(['/main/jugadores', uuid]);
  }

  detalleEquipo(nombre_equipo: string | null) {
    let equipoUUID = this.equipos.filter((e) => e.nombre == nombre_equipo);
    this.router.navigate(['/main/equipos', equipoUUID[0].id]);
  }
}
