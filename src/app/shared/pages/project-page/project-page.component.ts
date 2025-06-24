import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectsComponent } from "../../../features/projects/projects.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProjectService } from 'app/features/projects/project.service';
import { Project } from 'app/core/interfaces/project.interface';
import { HeaderComponent } from "../../components/header/header/header.component";
import { CommonModule } from '@angular/common';

@Component({

  standalone: true,
  imports: [ProjectsComponent, BreadcrumbModule, CommonModule],
  template: `

  <ng-container class="flex flex-col" *ngIf="projects.length > 0">
  
    <projects-template [projects]="projects" [userID]="userID" (projectAdded)="onProjectAddedHandler()" />
  </ng-container>
  <ng-container *ngIf="projects.length === 0">
  <p class="pt-[150px]">Cargando proyectos...</p>
  </ng-container>
  
  `,
  providers: [ProjectService],
  styleUrl: './project-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}
  public projects: Project[] = [
    // Example projects, these will be replaced by the actual data from the service
    // { id: '1', title: '--', description: '--' },
    // { id: '2', title: 'Project Two', description: 'Description of Project Two' },
  ];
  public userID:string = "";
  ngOnInit(): void {
    this.projectService.getUserProjects().subscribe((res: any) => {
      console.log("esta es la respuesta sdel server:",res);
      console.log("este es el id del usuario:",res.id);
      console.log("estos son los proyectos del usuario:",res.projects);
      // await(1000)
      this.projects = res.projects;
      this.userID = res.id;
      // this.getChargedProjects();
      this.cdr.detectChanges();
    });

    
    

  }

  loadUserProjects(): void { // Crea una función dedicada para cargar/recargar
    this.projectService.getUserProjects().subscribe((res: any) => {
      this.projects = res.projects;
      this.userID = res.id;
      console.log('Proyectos cargados en Padre:', this.projects);
      this.cdr.detectChanges(); // Forzar la detección de cambios para actualizar la vista
      console.log('Proyectos cargados en Padre (después de actualizar):', this.projects);
    });
  }
  onProjectAddedHandler(): void {
    console.log('Evento projectAdded recibido del hijo. Recargando proyectos...');
    this.loadUserProjects(); // Llama a la función para recargar la lista
  }
  
  // getChargedProjects() {
  //   console.log('Proyectos cargados:', this.projects);
  // }
}
