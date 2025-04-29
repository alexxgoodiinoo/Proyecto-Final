import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Equipo } from '../../../main/interfaces/equipo.interface';
import { MainService } from '../../../main/services/main.service';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent implements OnInit{
  public registerForm: FormGroup;
  public errorRegistro: string | null = null;
  public registroCompletado: boolean = false;
  public mostrarSeleccionEquipo: boolean = false;
  public equipos: Equipo[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private mainService: MainService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tipo_usuario: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', Validators.required],
        id_equipo: ['']
      },
      {
        validators: [this.passwordsIgualesValidator],
      }
    );

    this.registerForm.get('tipo_usuario')?.valueChanges.subscribe(
      valor => this.mostrarSeleccionEquipo = valor === "manager"
    );
  }

  ngOnInit(): void {
    this.mainService.getEquipos().subscribe(
      equipos => this.equipos = equipos
    )
  }

  private passwordsIgualesValidator(
    formGroup: AbstractControl
  ): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const password2 = formGroup.get('password2')?.value;
    return password === password2 ? null : { passwordNoIgual: true };
  }

  onRegister(): void {
    this.errorRegistro = null;
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) { return; }

    const valores = this.registerForm.value;
    const nuevoUsuario: User = {
      username: valores.username,
      email: valores.email,
      password: valores.password,
      tipo_usuario: valores.tipo_usuario,
      id_equipo: '',
    };

    this.authService.usernameExists(nuevoUsuario.username, nuevoUsuario.password).subscribe({
      next: (user) => {
        if (!user) {
          this.authService.register(nuevoUsuario).subscribe({
            next: () => {
              this.registerForm.reset();
              this.registroCompletado = true;
              this.router.navigate(['/auth/register']);
            },
            error: (err) => {
              this.errorRegistro = 'Hubo un error al registrar el usuario.';
              console.log(err);
            },
          });
        } else {
          this.errorRegistro = 'El usuario ya está registrado.';
        }
      },
      error: (err) => {
        this.errorRegistro = 'Hubo un problema al verificar el usuario.';
      },
    });
  }
}
