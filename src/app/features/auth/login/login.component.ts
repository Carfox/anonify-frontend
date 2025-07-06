import { Component, inject, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';

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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  private authService = inject(AuthService);
  // private router= inject(Router);
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit(): void {}

  clearForm() {
    this.loginForm.reset();
  }

  login(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;

      console.log(
        'usuario :',
        this.loginForm.value.username,
        'Contrasenia :',
        this.loginForm.value.password
      );
      this.authService
        .postLogin(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (res: any) => {
            console.log('salida del login', res);

            if (res == null) {
              Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.',
              }).finally(() => {
                this.clearForm();
              });
              return
            }
            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesion correcto',
              text: 'Bienvenido al sistema',
            }).finally(() => {
              this.router.navigate(['/anonify/home']);
            });
          },
          error: (err) => {
            console.error(err);
            // this.authService.logout()
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.',
            }).finally(() => {
              this.clearForm();
            });

            // alert('Error al iniciar sesión');
          },
        });
    }, 1000);
  }
}
