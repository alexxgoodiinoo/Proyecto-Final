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

  filtroTipo: 'proximos' | 'jugados' = 'proximos';
  tiposFiltro = [
    { clave: 'proximos', label: 'Próximos partidos' },
    { clave: 'jugados', label: 'Partidos jugados' },
  ] as const  // El const sirve para asegurar que las claves solo sean esas dos (proximos o jugados)

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
    const filtro = this.filtroNombre.toLowerCase().trim();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Para comparar solo la fecha

    let filtrados = this.partidos
      .filter((partido) => {
        if (!filtro) return true;

        const nombreLocal = partido.nombre_equipo_local?.toLowerCase() || '';
        const nombreVisitante =
          partido.nombre_equipo_visitante?.toLowerCase() || '';

        return nombreLocal.includes(filtro) || nombreVisitante.includes(filtro);
      })
      .filter((partido) => {
        if (!partido.fecha) return false;
        const fechaPartido = new Date(partido.fecha);
        fechaPartido.setHours(0, 0, 0, 0);

        if (this.filtroTipo === 'proximos') {
          return fechaPartido >= hoy;
        } else {
          return fechaPartido < hoy;
        }
      })
      .sort((a, b) => {
        const fechaA = a.fecha? new Date(a.fecha).getTime() : 0;
        const fechaB = b.fecha? new Date(b.fecha).getTime() : 0;

        return this.filtroTipo === 'proximos'
          ? fechaA - fechaB
          : fechaB - fechaA;
      });

    return filtrados;
  }

  cargarImagenPorDefecto(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/escudo-incognita.jpg';
  }
}
