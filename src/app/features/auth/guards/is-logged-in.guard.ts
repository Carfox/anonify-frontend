import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { getToken } from 'app/core/interceptor/token.interceptor';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';
export const isLoggedInGuard: CanMatchFn = (
  route,
  segments
): MaybeAsync<GuardResult> => {
  const router = inject(Router);

  const authService = inject(AuthService);

  return authService.validateToken().pipe(
    map((res: any) => {

      return true;
      // El token es válido
    }),
    catchError((err) => {
      console.error(err);
        Swal.fire({
          title: 'Sesion expirada se redijira para inicio de sesión',
          icon: 'warning',
          timer: 2000,
        }).finally(() => {
          router.navigate(['/login']);
        });
      return of(false); // El token no es válido
    })
  );
};
