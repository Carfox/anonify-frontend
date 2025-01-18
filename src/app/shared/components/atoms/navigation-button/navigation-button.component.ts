import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'shared-nav-button',
  standalone: true,
  imports: [Button, CommonModule],
  template: `<p-button
    label="{{ label }}"
    icon="pi {{ icon }}"
    iconPos="right"
    [ngClass]="{ disabled: disabled }"
    (onClick)="goToNav()"
  ></p-button>`,
  styleUrl: './navigation-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonComponent {
  @Input({ required: true }) label: string;
  @Input({ required: true }) icon: string;
  @Input({ required: false }) disabled: boolean;
  @Input({ required: false }) nav: string;
  router = inject(Router);
  goToNav() {
    console.log('Navegando a:', this.nav);
    this.router.navigate(['/a', this.nav]);
  }
}
