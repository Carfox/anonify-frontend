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
import { Project } from 'app/core/interfaces/project.interface';
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
  ],
  providers: [MessageService],
  template: `
    <p-toast />
    <div class="w-screen flex items-center justify-center">
      <div class="container pt-[150px] max-md:w-[95%] md:w-[80%]">
        <!-- Botones -->
        <div class="buttons flex justify-start gap-4 p-4">
          <p-button (click)="showDialog()" label="Nuevo Proyecto"></p-button>
          <p-button (click)="getAllProjects()" label="All Proyecto"></p-button>
        </div>

        <!-- División -->
        <hr class="divider" />

        <!-- Selector de Project List -->

        <div class="flex mb-4 w-full">
          <p-tabs value="0" class="w-full">
            <p-tablist class="w-full">
              <p-tab value="0">Mis Proyectos</p-tab>
              <p-tab value="1">Compartidos</p-tab>
            </p-tablist>

            <p-tabpanels class="w-full">
              <p-tabpanel value="0">
                <project-list [projects]="projects"></project-list>
              </p-tabpanel>
              <p-tabpanel value="1">
                <p>Agregar proyectos compartidos</p>
              </p-tabpanel>
            </p-tabpanels>
          </p-tabs>
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
          <span class="text-surface-500 dark:text-surface-400 block mb-6"
            >Ingresa un titulo y descripción al proyecto</span
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
              placeholder="Maximo 1000 caracteres."
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
    </div>
  `,
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @Input({ required: true }) projects: Project[] = [];
  @Input({ required: true }) userID: string = '';
  @Output() projectAdded = new EventEmitter<void>(); // Define un evento de salida
  public title: string = '';
  public description: string = '';
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

    if (changes['userID']) {
      console.log('UserID ha cambiado:', changes['userID'].currentValue);
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
      this.userID = res.id;
      console.log('Proyectos obtenidos:', this.projects);
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

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
