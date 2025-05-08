import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  public navItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home',
    },
    {
      label: 'Anonimización',
      routerLink: '/a',
    },
  ];
}
