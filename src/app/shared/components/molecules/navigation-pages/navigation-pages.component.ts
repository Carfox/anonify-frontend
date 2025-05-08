import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { NavigationButtonComponent } from '../../atoms/navigation-button/navigation-button.component';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from 'app/shared/services/navigation.service';
import {filter} from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-nav-pages',
  standalone: true,
  imports: [CommonModule, NavigationButtonComponent],
  template: `
      <!-- <shared-nav-button
        *ngIf="nav.previous; else noPrevious"
        label="Regresar"
        icon="pi-arrow-left"
        nav="{{ nav.previous.routerLink }}"
      >
      </shared-nav-button>
      <ng-template #noPrevious>
        <shared-nav-button label="Regresar" icon="pi-arrow-left" />
      </ng-template>
      <shared-nav-button
        label="Siguiente"
        icon="pi-arrow-right"
        nav="{{ nav.next.routerLink }}"
      >
      </shared-nav-button> -->
  `,
  styleUrl: './navigation-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPagesComponent {
  ////////////////////////////////////////////////////////////////////////////////
  //Esta seccion de codigo se ha comentado porque no se utuiliza en la aplicacion,
  // se ha dejado para futuras referencias o para ser utilizada en el futuro.
  // utilizabamos el servicio NavigationService para obtener los items de navegacion
  // y el router para obtener la url activa.
  ////////////////////////////////////////////////////////////////////////////////


  // public items = inject(NavigationService).anonNavitems;
  // public nav: any | undefined;

  // constructor(private router: Router) {
  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe((event) => {
  //       console.log(event);
  //       try {
  //         this.nav = this.findRouteAndNeighbors(this.items, event.url);
  //         console.log('Resultado:', this.nav);
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //     });
  // }

  // findRouteAndNeighbors(
  //   routes: MenuItem[],
  //   activeRoute: string
  // ): { previous?: MenuItem; match?: MenuItem; next?: MenuItem } {
  //   // Encuentra el índice del objeto que hace match
  //   const index = routes.findIndex((route) =>
  //     activeRoute.includes(route.routerLink)
  //   );

  //   if (index === -1) {
  //     throw new Error(
  //       'No se encontró un objeto con un routerLink que coincida.'
  //     );
  //   }
  //   return {
  //     previous: index > 0 ? routes[index - 1] : undefined, // El anterior, si existe
  //     match: routes[index], // El objeto que hace match
  //     next: index < routes.length - 1 ? routes[index + 1] : undefined, // El siguiente, si existe
  //   };
  // }
}
