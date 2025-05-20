import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'Anonify';
  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
     this.primeng.zIndex = {
       modal: 1100, // dialog, sidebar
       overlay: 1000, // dropdown, overlaypanel
       menu: 1000, // overlay menus
       tooltip: 1100, // tooltip
     };
  }
}
