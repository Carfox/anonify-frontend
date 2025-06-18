import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from 'app/core/interfaces/project.interface';
import { ProjectCardComponent } from "../project-card/project-card.component";

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <div class="flex flex-wrap justify-start">
      @for (project of projects; track project.id) {
      <project-card class="m-2 md:w-[45%] lg:w-[300px] max-md:w-full" [item]="project"> </project-card>
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
