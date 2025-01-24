import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from '../../components/organism/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { Card } from 'primeng/card';
import { NavigationPagesComponent } from 'app/shared/components/molecules/navigation-pages/navigation-pages.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    DividerModule,
    Card,
    NavigationPagesComponent,
  ],
  template: `
    <p-card header="Anonify">
      <shared-nav-bar />
      <shared-nav-pages />
    </p-card>
    <router-outlet />
  `,
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {}
