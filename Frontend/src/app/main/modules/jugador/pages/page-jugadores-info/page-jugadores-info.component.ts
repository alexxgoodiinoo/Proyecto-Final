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
}
