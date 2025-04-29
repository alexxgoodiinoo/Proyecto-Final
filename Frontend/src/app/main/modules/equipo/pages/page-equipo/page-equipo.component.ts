import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { MainService } from '../../../../services/main.service';
import { ActivatedRoute } from '@angular/router';
import { Jugador } from '../../../../interfaces/jugador.interface';

@Component({
  selector: 'app-page-equipo',
  standalone: false,
  templateUrl: './page-equipo.component.html',
})
export class PageEquipoComponent implements OnInit {
  tipoUsuario: string | null = null;

  public equipo!: Equipo;
  public jugadores: Jugador[] = [];
  public uuid!: string;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }

    this.route.params.subscribe((params) => {
      this.uuid = params['uuid'];

      this.mainService.getUnEquipo(this.uuid).subscribe({
        next: (equipo) => (this.equipo = equipo),
        error: (err) => console.log(err),
      });

      this.mainService.getTeamPlayers(this.uuid).subscribe({
        next: (jugadores) => (this.jugadores = jugadores),
        error: (err) => console.log(err),
      });
    });
  }
}
