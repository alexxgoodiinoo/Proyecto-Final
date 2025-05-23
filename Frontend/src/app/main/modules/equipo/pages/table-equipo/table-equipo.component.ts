import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-equipo',
  standalone: false,
  templateUrl: './table-equipo.component.html',
})
export class TableEquipoComponent implements OnInit {
  public equipos: Equipo[] = [];
  public filtroNombre: string = '';
  editandoEquipoId: string | null = null;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.mainService
      .getEquipos()
      .subscribe((equipo) => (this.equipos = equipo));
  }

  get equiposFiltrados(): Equipo[] {
    return this.equipos.filter(
      (equipo) => equipo.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  onEditEquipo(uuid: string) {
    this.editandoEquipoId = uuid;
  }

  onGuardarEquipo(equipo: Equipo) {
    if (!equipo.id) return;
    this.mainService.updateEquipo(equipo.id, equipo).subscribe({
      next: () => {
        console.log('Equipo actualizado con éxito');
        this.editandoEquipoId = null;
        this.cargarEquipos();
      },
      error: (err) => {
        console.error('Error al actualizar el equipo', err);
      },
    });
  }

  onCancelarEdicionEquipo() {
    this.editandoEquipoId = null;
    this.cargarEquipos();
  }

  onDeleteEquipo(uuid: string) {
    this.mainService.deleteEquipo(uuid).subscribe({
      next: () => {
        this.equipos = this.equipos.filter((e) => e.id !== uuid);
      },
      error: (err) => {
        console.error('Error al eliminar equipo:', err);
      },
    });
  }

  detalleEquipo(uuid: string){
    this.router.navigate(['/main/equipos', uuid]);
  }
}
