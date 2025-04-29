import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Partido } from '../../../../interfaces/partido.interface';
import { Equipo } from '../../../../interfaces/equipo.interface';

@Component({
  selector: 'app-table-partido',
  standalone: false,
  templateUrl: './table-partido.component.html',
})
export class TablePartidoComponent implements OnInit {
  public partidos: Partido[] = [];
  public equipos: Equipo[] = [];
  editandoPartidoId: string | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.cargarPartidos();
    this.mainService
      .getEquipos()
      .subscribe((equipo) => (this.equipos = equipo));
  }

  cargarPartidos(){
    this.mainService
      .getPartidos()
      .subscribe((partido) => (this.partidos = partido));
  }

  onEditPartido(uuid: string) {
    this.editandoPartidoId = uuid;
  }

  onGuardarPartido(partido: Partido) {
    if (!partido.id) return;
    console.log(partido);
    this.mainService.updatePartido(partido.id, partido).subscribe({
      next: () => {
        console.log('Partido actualizado con éxito');
        this.editandoPartidoId = null;
        this.cargarPartidos();
      },
      error: (err) => {
        console.error('Error al actualizar el partido', err);
      },
    });
  }

  onCancelarEdicionPartido() {
    this.editandoPartidoId = null;
  }

  onDeletePartido(uuid: string) {
    this.mainService.deletePartido(uuid).subscribe({
      next: () => {
        this.partidos = this.partidos.filter((e) => e.id !== uuid);
      },
      error: (err) => {
        console.log('Error al eliminar el partido ', err);
      },
    });
  }
}
