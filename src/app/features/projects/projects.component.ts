import { ChangeDetectionStrategy, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectService } from './project.service';
import { Button } from 'primeng/button';
import { Project } from 'app/core/interfaces/project.interface';
import { ProjectListComponent } from "./project-list/project-list.component";
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'projects-template',
  standalone: true,
  imports: [
    Button,
    ProjectListComponent,
    Dialog,
    InputTextModule,
    AvatarModule,
    TextareaModule,
    FormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <p-toast />
    <div class="container">
      <!-- Botones -->
      <div class="buttons flex justify-content-start gap-3 p-3">
        <p-button (click)="showDialog()" label="Nuevo Proyecto"></p-button>
        <p-button (click)="getAllProjects()" label="All Proyecto"></p-button>
      </div>

      <!-- División -->
      <hr class="divider" />

      <!-- Selector de Project List -->
      <div class="flex  mb-3">
        <project-list [projects]="projects"></project-list>
      </div>
    </div>
    <div class="card flex justify-center">
      <p-dialog
        [(visible)]="visible"
        [modal]="true"
        [style]="{ width: '25rem' }"
      >
        <ng-template #header>
          <span class="font-bold whitespace-nowrap">Nuevo Proyecto</span>
        </ng-template>
        <span class="text-surface-500 dark:text-surface-400 block mb-4"
          >Ingresa un titulo y descripción al proyecto</span
        >
        <div class="mb-4">
          <label for="titleProject" class="block font-semibold mb-2"
            >Título</label
          >
          <input
            pInputText
            id="titleProject"
            [(ngModel)]="title"
            class="w-full"
            autocomplete="off"
          />
        </div>
        <div class="mb-4">
          <label for="descriptionProject" class="block font-semibold mb-2"
            >Descripción</label
          >
          <textarea
            pTextarea
            id="descriptionProject"
            rows="5"
            [(ngModel)]="description"
            cols="20"
            style="resize: none"
            class="w-full"
          ></textarea>
        </div>

        <ng-template #footer>
          <p-button
            label="Cancel"
            [text]="true"
            severity="secondary"
            (click)="visible = false"
          />
          <p-button
            label="Save"
            [outlined]="true"
            severity="secondary"
            (click)="visible = false"
            (onClick)="onSaveNewProject()"
          />
        </ng-template>
      </p-dialog>
    </div>
  `,
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  public projects!: Project[];
  private userID: string;
  public title: string;
  public description: string;
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.allprojects.subscribe((res: any) => {
      console.log(res);
      this.projects = res.projects;
      this.userID = res.id;
    });
  }

  getAllProjects(): void {
    this.projectService.allprojects.subscribe((res: any) => {
      this.projects = res.projects;
      this.userID = res.id;
    });
  }

  onSaveNewProject() {
    console.log(this.title, this.description);
    this.projectService
      .postNewProject(this.title, this.description, this.userID)
      .subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: `Proyecto ${this.title} guardado con éxito!`,
            life: 3000,
          });
          this.title = '';
          this.description = '';
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al crear proyecto',
            detail: error.message,
          });
        }
      );
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
