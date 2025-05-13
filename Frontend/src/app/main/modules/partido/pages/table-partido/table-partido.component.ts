import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Partido } from '../../../../interfaces/partido.interface';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-partido',
  standalone: false,
  templateUrl: './table-partido.component.html',
})
export class TablePartidoComponent implements OnInit {
  public filtroNombre: string = '';
  public partidos: Partido[] = [];
  public equipos: Equipo[] = [];
  editandoPartidoId: string | null = null;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPartidos();
    this.mainService
      .getEquipos()
      .subscribe((equipo) => (this.equipos = equipo));
  }

  get partidosFiltrados(): Partido[] {
    const filtro = this.filtroNombre.toLowerCase().trim();

    return this.partidos.filter((partido) => {
      if (!filtro) return true;
      
      const nombreLocal = partido.nombre_equipo_local?.toLowerCase() || '';
      const nombreVisitante = partido.nombre_equipo_visitante?.toLowerCase() || '';

      return nombreLocal.includes(filtro) || nombreVisitante.includes(filtro);
    });
  }

  cargarPartidos() {
    this.mainService
      .getPartidos()
      .subscribe((partido) => (this.partidos = partido));
  }

  onEditPartido(uuid: string) {
    this.editandoPartidoId = uuid;
  }

  onGuardarPartido(partido: Partido) {
    if (!partido.id) return;
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

  detalleEquipoLocal(uuidEquipoLocal: string | null){
    this.router.navigate(['/main/equipos/', uuidEquipoLocal])
  }

  detalleEquipoVisitante(uuidEquipoVisitante: string | null){
    this.router.navigate(['/main/equipos/', uuidEquipoVisitante])
  }
}
