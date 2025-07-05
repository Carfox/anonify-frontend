import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ProjectsComponent } from '../../../features/projects/projects.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProjectService } from 'app/features/projects/project.service';
import { Project } from 'app/core/interfaces/project.interface';
import { HeaderComponent } from '../../components/header/header/header.component';
import { CommonModule } from '@angular/common';
import {
  UserMinInformation,
  UserPublicInformation,
} from 'app/core/interfaces/user.interface';
import { UserService } from 'app/features/users/user.service';

@Component({
  standalone: true,
  imports: [ProjectsComponent, BreadcrumbModule, CommonModule],
  template: `
    <ng-container class="flex flex-col" *ngIf="!loading">
      <projects-template
        [projects]="projects"
        [sharedProjects]="sharedProjects"
        [usersList]="usersList"
        [userID]="userID"
        (projectAdded)="onProjectAddedHandler()"
      />
    </ng-container>
    <ng-container *ngIf="projects.length === 0" class="w-full min-h-screen">
      <div
        class="mt-[100px] w-screen flex justify-center items-center h-[calc(100vh-100px)]"
        *ngIf="loading"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </ng-container>
  `,
  providers: [ProjectService],
  styleUrl: './project-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}
  public projects: Project[] = [];
  public loading: boolean = false;
  public userID: string = '';
  public sharedProjects: Project[] = [];
  public usersList: UserMinInformation[];
  ngOnInit(): void {
    this.loading = true;
    this.projectService.getUserProjects().subscribe((res: any) => {
      console.log('esta es la respuesta sdel server:', res);
      console.log('este es el id del usuario:', res.id);
      console.log('estos son los proyectos del usuario:', res.projects);
      // await(1000)
      this.projects = res.projects;
      this.sharedProjects = res.shared;
      this.userID = res.id;
      this.loading = false;

      // this.getChargedProjects();
      console.log('Datos TEST:', res);
      this.cdr.detectChanges();
    });

    this.userService.getMinUsersInfo().subscribe((res: any) => {
      this.usersList = res;

      console.log('Lista de usuarios', this.usersList);
      this.cdr.detectChanges();
    });
  }

  loadUserProjects(): void {
    // Crea una función dedicada para cargar/recargar
    this.projectService.getUserProjects().subscribe((res: any) => {
      this.projects = res.projects;
      this.userID = res.id;
      this.sharedProjects = res.shared;
      console.log('Proyectos cargados en Padre:', this.projects);
      this.cdr.detectChanges(); // Forzar la detección de cambios para actualizar la vista
      console.log(
        'Proyectos cargados en Padre (después de actualizar):',
        this.projects
      );
    });
  }
  onProjectAddedHandler(): void {
    console.log(
      'Evento projectAdded recibido del hijo. Recargando proyectos...'
    );
    this.loadUserProjects(); // Llama a la función para recargar la lista
  }

  // getChargedProjects() {
  //   console.log('Proyectos cargados:', this.projects);
  // }
}
