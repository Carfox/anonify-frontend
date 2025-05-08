import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private router: Router) {}
  // onStart() {
  //   if(!localStorage.getItem('token')) {
  //   this.router.navigate(['/auth'])}
  //   else {
  //     this.router.navigate(['/projects'])
  //   }
  // }
}
