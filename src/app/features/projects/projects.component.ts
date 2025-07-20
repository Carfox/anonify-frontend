import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProjectService } from './project.service';
import { Button } from 'primeng/button';
import { Project, ShareProject } from 'app/core/interfaces/project.interface';
import { ProjectListComponent } from './project-list/project-list.component';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DatasetService } from '../datasets/dataset.service';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { concat } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserMinInformation } from 'app/core/interfaces/user.interface';

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
    StepperModule,
    TabsModule,
    CommonModule,
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div class="w-full min-h-screen bg-[#fefcf7] pt-8 pl-8 pr-4">
      <div class="max-w-screen-xl">
        <!-- Botones -->
        <div class="flex justify-start gap-4 mb-4">
          <p-button (click)="showDialog()" label="Nuevo Proyecto"></p-button>
          <p-button
            (click)="showShareDialog()"
            label="Compartir Proyecto"
          ></p-button>
        </div>

        <!-- División -->
        <hr class="border-t border-gray-300 mb-6" />

        <!-- Tabs -->
        <p-tabs value="0" class="w-full">
          <p-tablist class="w-full">
            <p-tab value="0">Mis Proyectos</p-tab>
            <p-tab value="1">Compartidos Conmigo</p-tab>
          </p-tablist>

          <p-tabpanels class="w-full">
            <p-tabpanel value="0">
              <project-list [projects]="projects"></project-list>
            </p-tabpanel>
            <p-tabpanel value="1">
              <project-list [projects]="sharedProjects"></project-list>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </div>

      <!-- Diálogo Nuevo Proyecto -->
      <p-dialog
        [(visible)]="visible"
        [modal]="true"
        [style]="{ width: '25rem' }"
      >
        <ng-template #header>
          <span class="font-bold whitespace-nowrap">Nuevo Proyecto</span>
        </ng-template>

        <span class="text-gray-500 block mb-6"
          >Ingresa un título y descripción al proyecto</span
        >

        <div class="mb-6">
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

        <div class="mb-6">
          <label for="descriptionProject" class="block font-semibold mb-2"
            >Descripción</label
          >
          <textarea
            pTextarea
            id="descriptionProject"
            placeholder="Máximo 1000 caracteres."
            rows="5"
            [(ngModel)]="description"
            class="w-full"
            style="resize: none"
          ></textarea>
        </div>

        <ng-template #footer>
          <p-button
            label="Cancelar"
            [text]="true"
            severity="secondary"
            (click)="visible = false"
          />
          <p-button
            label="Guardar"
            [outlined]="true"
            severity="secondary"
            (click)="visible = false"
            (onClick)="onSaveNewProject()"
          />
        </ng-template>
      </p-dialog>

      <!-- Diálogo Compartir Proyecto -->
      <p-dialog [(visible)]="share" [modal]="true" [style]="{ width: '30rem' }">
        <ng-template #header>
          <span class="font-bold whitespace-nowrap">Compartir Proyecto</span>
        </ng-template>

        <span class="text-gray-500 block mb-6"
          >Seleccione el proyecto y los usuarios a compartir</span
        >

        <div class="mb-6">
          <label class="block font-semibold mb-2">Proyecto</label>
          <select
            [(ngModel)]="shareInfo.projectID"
            class="border border-gray-300 rounded-md p-2 w-full"
          >
            <option *ngFor="let project of allProjects" [value]="project.id">
              {{ project.title }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block font-semibold mb-2">Usuarios</label>
          <div class="relative overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-gray-700">
              <thead class="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th class="px-6 py-3">Agregar</th>
                  <th class="px-6 py-3">Nombre</th>
                  <th class="px-6 py-3">Usuario</th>
                  <th class="px-6 py-3">Rol</th>
                </tr>
              </thead>
              <tbody>
                @for (user of usersList; track user) {
                <tr class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <input
                      type="checkbox"
                      [checked]="shareInfo.authors.includes(user.id)"
                      (change)="
                        toggleAuthorSelection(user.id, $event.target.checked)
                      "
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td class="px-6 py-4">{{ user.name }}</td>
                  <td class="px-6 py-4">{{ user.username }}</td>
                  <td class="px-6 py-4">{{ user.role.name }}</td>
                </tr>
                } @empty {
                <tr>
                  <td colspan="4" class="text-center px-4 py-4 text-gray-500">
                    No hay usuarios disponibles
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <ng-template #footer>
          <p-button
            label="Cancelar"
            [text]="true"
            severity="secondary"
            (click)="share = false"
          />
          <p-button
            label="Compartir"
            [outlined]="true"
            severity="secondary"
            (click)="share = false"
            (onClick)="onShareProject()"
          />
        </ng-template>
      </p-dialog>
    </div>
  `,
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @Input({ required: true }) projects: Project[] = [];
  @Input({ required: true }) userID: string = '';
  @Input({ required: true }) sharedProjects: Project[] = [];
  @Input({ required: true }) usersList: UserMinInformation[] = [];

  @Output() projectAdded = new EventEmitter<void>(); // Define un evento de salida
  public title: string = '';
  public description: string = '';
  public allProjects: Project[] = this.projects.concat(this.sharedProjects);
  shareInfo: ShareProject = {
    projectID: '',
    authors: [],
  };
  visible: boolean = false;
  share: boolean = false;
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // 'changes' contiene un objeto con las propiedades que han cambiado.
    // Cada propiedad en 'changes' es un objeto SimpleChange con
    // 'currentValue', 'previousValue' y 'firstChange'.

    if (changes['projects']) {
      console.log('Projects ha cambiado:', changes['projects'].currentValue);
      // Realiza aquí la lógica que dependa de 'projects'
      // this.doSomethingWithProjects(changes['projects'].currentValue);
    }

    if (changes['allProjects']) {
      console.log(
        'AllProjects ha cambiado:',
        changes['allProjects'].currentValue
      );
      // Realiza aquí la lógica que dependa de 'userID'
      // this.doSomethingWithUserID(changes['userID'].currentValue);
    }
  }

  ngOnInit(): void {
    console.log('Proyectos iniciales:', this.projects);
  }

  getAllProjects(): void {
    this.projectService.allprojects.subscribe((res: any) => {
      this.projects = res.projects;
      this.sharedProjects = res.shared;
      this.userID = res.id;
      this.allProjects = this.projects.concat(this.sharedProjects);
      console.log('Proyectos obtenidos:', this.projects);
      console.log('Proyectos compartidos:', this.sharedProjects);
      console.log('Proyectos totales:', this.allProjects);
    });
  }

  onSaveNewProject() {
    console.log(this.title, this.description);
    this.projectService.postNewProject(this.title, this.description).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: `Proyecto ${this.title} guardado con éxito!`,
          life: 3000,
        });
        this.title = '';
        this.description = '';

        // *** Emite el evento al padre para que refresque la lista ***
        this.projectAdded.emit();
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
  onShareProject() {
    console.info('informacion a enviar al compartir', this.shareInfo);

    if (this.shareInfo.projectID != '' && this.shareInfo.authors.length > 0) {
      this.projectService.shareProject(this.shareInfo).subscribe({
        next: (res: any) => {
          console.log('Respuesta de compartir', res);

          this.messageService.add({
            severity: 'success',
            summary: 'Proyecto compartido correctamente',
            detail: `El proyecto se ha compartido a los usuarios seleccionados`,
            life: 3000,
          });
          this.share = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Alerta',
            detail: `Error:${err}`,
            life: 3000,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Alerta',
        detail: `No ha llenado los campos correctamente`,
        life: 3000,
      });
    }

    this.projectService.shareProject(this.shareInfo);
  }
  toggleAuthorSelection(userId: string, checked: boolean): void {
    if (checked) {
      if (!this.shareInfo.authors.includes(userId)) {
        this.shareInfo.authors.push(userId);
      }
    } else {
      this.shareInfo.authors = this.shareInfo.authors.filter(
        (id) => id !== userId
      );
    }
  }
  showDialog() {
    this.visible = true;
  }
  showShareDialog() {
    this.allProjects = this.projects.concat(this.sharedProjects);

    this.share = true;
  }
}
