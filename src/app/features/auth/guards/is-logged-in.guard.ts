import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';

export const isLoggedInGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.validateToken().pipe(
    map((res) => {
      if (res) return true;
      // si devuelve null, lo tratamos como sesión expirada
      throw new Error('Token inválido');
    }),
    catchError(() => {
      Swal.fire({
        title: 'Sesión expirada',
        text: 'Serás redirigido al inicio de sesión.',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.navigate(['/login']);
      });
      return of(false);
    })
  );
};
