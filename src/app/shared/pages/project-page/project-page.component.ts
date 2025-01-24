import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectsComponent } from "../../../features/projects/projects.component";

@Component({
  standalone: true,
  imports: [ProjectsComponent],
  template: ` <projects-template /> `,
  styleUrl: './project-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent {}
