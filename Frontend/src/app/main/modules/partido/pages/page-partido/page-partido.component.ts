import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Partido } from '../../../../interfaces/partido.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-partido',
  standalone: false,
  templateUrl: './page-partido.component.html',
})
export class PagePartidoComponent implements OnInit {
  tipoUsuario: string | null = null;
  public partido!: Partido;
  public uuid!: string;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }
    this.route.params.subscribe((params) => {
      this.uuid = params['uuid'];

      this.mainService.getUnPartido(this.uuid).subscribe({
        next: (partido) => (this.partido = partido),
        error: (err) => console.log(err),
      });
    });
  }

  dirigirAEquipo(uuid: string | null) {
    this.router.navigate(['/main/equipos/', uuid])
  }
}
