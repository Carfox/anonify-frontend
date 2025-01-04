import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { Toast } from 'primeng/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [Toast, StepsModule],
  template: `
    <div class="card">
      <!-- <p-toast /> -->
      <p-steps [model]="items" [readonly]="false" />
    </div>
  `,
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  public items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Cargar',
        routerLink: 'upload',
      },
      {
        label: 'Anonimizar',
        routerLink: 'anonimizar',
      },
      {
        label: 'Resultados',
        routerLink: 'review',
      },
    ];


  }


}
