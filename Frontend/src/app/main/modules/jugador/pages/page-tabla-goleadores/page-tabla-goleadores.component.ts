import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'app-page-tabla-goleadores',
  standalone: false,
  templateUrl: './page-tabla-goleadores.component.html',
})
export class PageTablaGoleadoresComponent implements OnInit {
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
