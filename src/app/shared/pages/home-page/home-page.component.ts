import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProjectsComponent } from "../../../features/projects/projects.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private router: Router) {}
  onStart() {
    this.router.navigate(['/a/upload']);
  }
}
