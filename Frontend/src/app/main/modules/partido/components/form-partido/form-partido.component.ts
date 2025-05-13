import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-partido-page',
  standalone: false,
  templateUrl: './form-partido.component.html',
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
      resultado: [null], //this.resultadoValidator
      id_equipo_local: [null],
      id_equipo_visitante: [null],
      hora: [null],
    });
  }

  // resultadoValidator(control: any){
  //   const valor = control.value;
  //   const regex = /^(\d{1,2})-(\d{1,2})$/;

  //   if (!valor || !regex.test(valor)) {
  //     return { formatoInvalido: true };
  //   }

  //   const [golesLocal, golesVisitante] = valor.split('-').map(Number);

  //   if (
  //     isNaN(golesLocal) ||
  //     isNaN(golesVisitante) ||
  //     golesLocal < 0 ||
  //     golesVisitante < 0 ||
  //     golesLocal > 99 ||
  //     golesVisitante > 99
  //   ) {
  //     return { valorInvalido: true };
  //   }

  //   return null;
  // }

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
