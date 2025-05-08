import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationService } from 'app/shared/services/navigation.service';
import { MenuItem } from 'primeng/api';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    BreadcrumbModule,
    CommonModule,
  ],
  template: `
    <div class="card">
      <p-menubar [model]="items">
        <ng-template #start>
          <!-- Logo o Nombre de la Aplicación -->
          <span class="font-bold text-lg">Anonify</span>
        </ng-template>
        <ng-template #end>
          <!-- Nombre del Usuario -->
          <div class="flex items-center gap-2">
            <p-avatar
              label="{{ userInitials }}"
              shape="circle"
              styleClass="mr-2"
            ></p-avatar>
            <span>{{ userName }}</span>
          </div>
        </ng-template>
      </p-menubar>
    </div>

  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items = inject(NavigationService).navItems;
  userName: string = 'Cosme Fulanito'; // Nombre del usuario
  userInitials: string = '';
  itemsNavigated: MenuItem[] | undefined = [{ label: 'Home' }];
  home: MenuItem | undefined;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.getUserInitials(this.userName);
  }

  private getUserInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
}
