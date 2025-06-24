import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'app/core/interfaces/project.interface';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import Swal from 'sweetalert2';
import { ProjectService } from '../project.service';
@Component({
  selector: 'project-card',
  standalone: true,
  imports: [CommonModule, CardModule, Button],
  template: `
      <p-card [style]="{ width: '100%', overflow: 'hidden' }">
        <ng-template #title>
          <h3>{{ item.title }}</h3>
        </ng-template>

        <p class="line-clamp-6 h-[126px]">{{ item.description }}</p>

        <ng-template #footer>
          <div class="flex gap-6 mt-1">
            
            <button class="rounded-md bg-secondary w-4/5 h-[40px]  text-white" (click)="onMoreInfo()">
            <i class="pi pi-eye"></i>
            Info Proyecto

            </button>
            <button class="rounded-md bg-red-400  h-[40px] aspect-square text-white" (click)="deleteProject(item.id)">
            <i class="pi pi-trash"></i>
            </button>
            
          </div>
        </ng-template>
      </p-card>
      
  `,
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input({ required: true }) item: Project;
  private router = inject(Router);

  constructor(
    private messageService: MessageService,
        private projectService: ProjectService
  ){}

  onMoreInfo() {
    this.router.navigate(['anonify/projects/', this.item.id]);
    console.log('Más información sobre el elemento:', this.item);
  }

  deleteProject(projectID: string) {
    Swal.fire({
      title:
        'Estas seguro que deseas eliminar toda la información del Proyecto?',
      // showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#F77070',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',

      // denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProjectById(projectID).subscribe({
          next: (res: any) => {
            console.log('Respuesta del servidor', res);
            // this.getAllProjects();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'El Proyecto se ha eliminado correctamente',
            });
          },
          error: (err) => {
            console.error('Error al eliminar el servicio', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el proyecto.',
            });
          },
        });
      }
    });
  }

}
