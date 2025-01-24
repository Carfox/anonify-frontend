import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // Esto lo hace un Standalone Component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputGroupModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  private authService = inject(AuthService);
  private router= inject(Router);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simula un inicio de sesión
    setTimeout(() => {
      this.isSubmitting = false;
      this.authService.postLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (res:any) => {
        localStorage.setItem('token', res.token);
        //TODO: Redirigir a la página de proyectos
        this.router.navigate(['/projects']);
      },
        error => {
          console.error(error);
          alert('Error al iniciar sesión');
    });
      console.log('Formulario enviado', this.loginForm.value);
    }, 2000);
  }
}
