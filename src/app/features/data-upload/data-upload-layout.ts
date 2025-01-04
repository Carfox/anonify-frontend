import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  standalone: true,
  selector: 'data-upload-layout',
  imports: [Menubar, RouterModule],
  template: `
    <h2>Cargar Información</h2>
    <div class="card">
      <p-menubar [model]="items" />
    </div>
    <router-outlet></router-outlet>
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
