import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  noLogueado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (user) => {
        if (user) {
  
          this.router.navigate(['/']);
          this.loginForm.reset();
        } else {
          this.noLogueado = true
        }
      },
      error: (err) => {
        console.log("Error en el login " + err);
        this.noLogueado = true;
      },
    });
  }
}
