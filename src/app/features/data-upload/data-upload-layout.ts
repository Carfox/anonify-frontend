import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Card } from 'primeng/card';
import { Menubar } from 'primeng/menubar';

@Component({
  standalone: true,
  imports: [Menubar, RouterModule, Card],
  template: `
    <p-card header="Cargar Información">
      <p-menubar [model]="items" />
      <router-outlet></router-outlet>
    </p-card>
  `,
  styles: [
    `
      nav {
        margin: 10px 0;
      }

      a {
        margin-right: 10px;
        text-decoration: none;
      }
    `,
  ],
})
export class DataUploadLayoutComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Subir por Archivo',
        icon: 'pi pi-file',
        routerLink: 'by-file',
      },
      {
        label: 'Subir por Base de Datos',
        icon: 'pi pi-database',
        routerLink: 'by-db',
      },
    ];
  }
}
