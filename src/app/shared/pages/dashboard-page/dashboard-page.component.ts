import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from '../../components/organism/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    DividerModule,
    Card,
  ],
  template: `
    <p-card header="Dashboard" class="w-full h-full">
      <p-divider></p-divider>
      <shared-nav-bar />
      <!-- <shared-nav-pages /> -->
    </p-card>
    <router-outlet />
  `,
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {}
