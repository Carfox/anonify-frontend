import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'shared-menu-bar',
  standalone: true,
  imports: [MenubarModule],
  template: `
    <div class="card">
      <p-menubar [model]="items">
      <ng-template #start>
        <div class="flex items-center space-x-2">
          <span class="text-lg font-extrabold tracking-wide font-serif"
            >ANONIFY</span
          >
        </div>
      </ng-template>
    </p-menubar>
    </div>
  `,
  styleUrl: './menu-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Anonimización',
        icon: 'pi pi-wrench',
        routerLink: ['/a'],
      },
      {
        label: 'Preprocesamiento',
        icon: 'pi pi-search',
        routerLink: ['/preprocessing'],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: ['/contact'],
      },
    ];
  }
}
