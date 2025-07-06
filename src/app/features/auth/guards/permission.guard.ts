import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = route.data['permissions'] as string[];

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  // se verifica que el usuario tiene todos los permisos necesarios enlistados en la ruta
  const hasAccess = authService.hasAllPermissions(requiredPermissions);

  if (hasAccess) {
    console.log('El usuario tiene permiso a esta seccion');
    return true; // Allow navigation
  } else {
    // 3. If access is denied, redirect to an "access denied" page or home
    console.warn(
      'Access denied: User does not have required permissions for this route.'
    );
    // You can navigate to a specific 'access-denied' page or your dashboard
    return router.createUrlTree(['/anonify']);
  }
};
