import type { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtén el token desde el localStorage
  if(localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    // Si el token existe, clona la solicitud y agrega el encabezado de autorización
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  // Continúa con la solicitud modificada o original
  return next(req);
};
