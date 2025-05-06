import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../../interfaces/jugador.interface';
import { MainService } from '../../../../services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-jugadores',
  standalone: false,
  templateUrl: './page-jugadores.component.html',
})
export class PageJugadoresComponent implements OnInit {
  tipoUsuario: string | null = null;

  public jugador!: Jugador;
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

      this.mainService.getUnJugador(this.uuid).subscribe({
        next: (jugador) => (this.jugador = jugador),
        error: (err) => console.log(err),
      });
    });
  }  
}
