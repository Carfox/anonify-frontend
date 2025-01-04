import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-data-upload-layout',
  template: `
    <h2>Subir Información</h2>
    <nav>
      <a routerLink="by-file">Cargar desde Archivo</a> |
      <a routerLink="by-db">Cargar desde Base de Datos</a>
    </nav>
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
  imports: [RouterModule],
})
export class DataUploadLayoutComponent {}
