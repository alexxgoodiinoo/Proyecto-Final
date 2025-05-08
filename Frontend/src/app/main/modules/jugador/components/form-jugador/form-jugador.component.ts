import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';
import { Equipo } from '../../../../interfaces/equipo.interface';

@Component({
  selector: 'app-form-jugador-page',
  standalone: false,
  templateUrl: './form-jugador.component.html',
  styles: ``,
})
export class FormJugadorComponent {
  crearJugadorForm!: FormGroup;
  jugadorNoCreado: boolean = false;
  jugadorCreado: boolean = false;
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

    this.crearJugadorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dorsal: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]?$|^99$/)],
      ],
      imagen: [''],
      posicion: ['', Validators.required],
      id_equipo: [''],
    });
  }

  onCrearJugador() {
    this.crearJugadorForm.markAllAsTouched();

    if (this.crearJugadorForm.valid) {
      const jugador = this.crearJugadorForm.value;
      this.mainService.newJugador(jugador).subscribe({
        next: () => {
          this.jugadorCreado = true;
          this.crearJugadorForm.reset();
        },
        error: (err) => {
          console.error('Error al crear el jugador:', err);
          this.jugadorNoCreado = true;
        },
      });
    }
  }
}
