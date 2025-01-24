import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from 'app/core/interfaces/project.interface';
import { ProjectCardComponent } from "../project-card/project-card.component";

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <div class="flex flex-wrap justify-content-start">
      @for (project of projects; track project.id) {
      <project-card class="m-4" [item]="project"> </project-card>
      } @empty {
      <h5>No existen proyectos</h5>
      }
    </div>

    <!-- <project-card /> -->
  `,
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  @Input() projects: Project[];
}
