import { Component, OnInit } from '@angular/core';
import { Partido } from '../../../../interfaces/partido.interface';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'app-page-partido-info',
  standalone: false,
  templateUrl: './page-partido-info.component.html',
})
export class PagePartidoInfoComponent implements OnInit {
  tipoUsuario: string | null = null;
  public partidos: Partido[] = [];
  public filtroNombre: string = '';

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService
      .getPartidos()
      .subscribe((partidos) => (this.partidos = partidos));
  }

  get partidosFiltrados(): Partido[] {
    return this.partidos.filter(
      (partidos) =>
        partidos
          .nombre_equipo_local?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase()) ||
        partidos
          .nombre_equipo_visitante?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase())
    );
  }

  cargarImagenPorDefecto(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/escudo-incognita.jpg';
  }
}
