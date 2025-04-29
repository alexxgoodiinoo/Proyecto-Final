import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-equipo-page',
  standalone: false,
  templateUrl: './form-equipo.component.html',
})
export class FormEquipoComponent implements OnInit {
  crearEquipoForm!: FormGroup;
  equipoNoCreado: boolean = false;
  equipoCreado: boolean = false;
  // escudoPreview: string = 'no-image.png';

  constructor(
    private mainService: MainService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearEquipoForm = this.fb.group({
      nombre: ['', Validators.required],
      escudo: [''],
      id_liga: [null],
    });
  }

  // onEscudoChange(): void {
  //   const escudoUrl = this.crearEquipoForm.get('escudo')?.value;

  //   if (escudoUrl && escudoUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)) {
  //     this.escudoPreview = escudoUrl;
  //   } else {
  //     this.escudoPreview = 'no-image.png';
  //   }
  // }

  onCrearEquipo() {
    this.crearEquipoForm.markAllAsTouched();

    if (this.crearEquipoForm.valid) {
      const equipo = this.crearEquipoForm.value;

      this.mainService.newEquipo(equipo).subscribe({
        next: (response) => {
          console.log('Equipo creado exitosamente:', response);
          this.equipoCreado = true;
        },
        error: (err) => {
          console.error('Error al crear el equipo:', err);
          this.equipoNoCreado = true;
        },
      });
    }
  }
}
