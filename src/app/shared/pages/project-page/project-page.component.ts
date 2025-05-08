import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsComponent } from "../../../features/projects/projects.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProjectService } from 'app/features/projects/project.service';
import { Project } from 'app/core/interfaces/project.interface';
import { HeaderComponent } from "../../components/header/header/header.component";

@Component({
  standalone: true,
  imports: [ProjectsComponent, BreadcrumbModule],
  template: `
    <projects-template [projects]="projects" [userID]="userID" />
  `,
  providers: [ProjectService],
  styleUrl: './project-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
  constructor(private projectService: ProjectService) {}
  public projects: Project[];
  public userID: string;
  ngOnInit(): void {
    this.projectService.allprojects.subscribe((res: any) => {
      console.log(res);
      this.projects = res.projects;
      this.userID = res.id;
    });
  }
}
