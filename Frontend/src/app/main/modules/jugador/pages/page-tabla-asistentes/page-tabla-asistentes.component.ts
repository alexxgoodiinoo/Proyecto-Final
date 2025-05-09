import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'app-page-tabla-asistentes',
  standalone: false,
  templateUrl: './page-tabla-asistentes.component.html',
})
export class PageTablaAsistentesComponent implements OnInit {
  tipoUsuario: string | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      this.tipoUsuario = user.data.tipo_usuario;
    }
  }
}
