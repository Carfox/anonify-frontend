import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  public items: MenuItem[] = [
    {
      label: 'Cargar Datos',
      routerLink: 'upload',
    },
    {
      label: 'Previsualizar',
      routerLink: 'preview',
    },
    {
      label: 'Identificadores',
      routerLink: 'identifier',
    },
    {
      label: 'Anonimizar',
      routerLink: 'anonymize',
    },
    {
      label: 'resultados',
      routerLink: 'review',
    },
  ];
}
