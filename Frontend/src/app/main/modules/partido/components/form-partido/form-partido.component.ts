import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-partido-page',
  standalone: false,
  templateUrl: './form-partido.component.html'
})

export class FormPartidoComponent {
  crearPartidoForm!: FormGroup;
  partidoNoCreado: boolean = false;
  partidoCreado: boolean = false;
  public equipos: Equipo[] = [];

  constructor(
    private mainService: MainService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mainService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));

    this.crearPartidoForm = this.fb.group({
      fecha: [null],
      resultado: [null],
      id_equipo_local: [null],
      id_equipo_visitante: [null],
      hora: [null],
    });
  }

  onCrearPartido() {
    if (this.crearPartidoForm.valid) {
      const partido = this.crearPartidoForm.value;

      this.mainService.newPartido(partido).subscribe({
        next: () => {
          this.partidoCreado = true;
          this.crearPartidoForm.reset();
        },
        error: (err) => {
          console.error('Error al crear el partido:', err);
          this.partidoNoCreado = true;
        },
      });
    }
  }
}
