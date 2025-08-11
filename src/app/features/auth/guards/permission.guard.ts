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

  const hasAccess = authService.hasAllPermissions(requiredPermissions);

  if (hasAccess) {
    return true;
  } else {
    console.warn('Access denied: User does not have required permissions');
    return router.createUrlTree(['/acceso-denegado']);
  }
};
