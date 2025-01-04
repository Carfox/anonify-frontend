import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from "../../components/organism/nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  template: `
    <shared-nav-bar></shared-nav-bar>
    <router-outlet />
  `,
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {}
