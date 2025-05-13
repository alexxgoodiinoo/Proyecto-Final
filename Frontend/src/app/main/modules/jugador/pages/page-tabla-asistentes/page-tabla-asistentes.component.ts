import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Jugador } from '../../../../interfaces/jugador.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-tabla-asistentes',
  standalone: false,
  templateUrl: './page-tabla-asistentes.component.html',
})
export class PageTablaAsistentesComponent implements OnInit {
  tipoUsuario: string | null = null;
  public jugadores: Jugador[] = [];
  public maxAsistentes: Jugador[] = [];
  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.mainService.getJugadores().subscribe((jugador) => {
      this.jugadores = jugador;
      this.ordenarJugadores();
    });
  }

  ordenarJugadores() {
    this.maxAsistentes = [...this.jugadores]
      .filter((jugador) => jugador.asistencias > 1)
      .sort((a, b) => b.asistencias - a.asistencias);
  }

  verJugador(uuidJugador: string){
    this.router.navigate(['/main/jugadores/', uuidJugador])
  }

  verEquipo(uuidEquipo: string | null){
    this.router.navigate(['/main/equipos/', uuidEquipo])
  }
}
