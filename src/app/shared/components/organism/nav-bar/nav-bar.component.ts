import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from 'app/shared/services/navigation.service';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [StepsModule],
  template: `
    <!-- <div class="card">
      <p-steps [model]="items" [readonly]="false" />
    </div> -->
  `,
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  // public items = inject(NavigationService).anonNavitems;

}
