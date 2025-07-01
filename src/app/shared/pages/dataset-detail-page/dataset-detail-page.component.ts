import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dataset } from 'app/core/interfaces/dataset.interface';
import { PreviewStepComponent } from 'app/features/anonymization-wizard/components/preview-step.component';
import { PreprocessingStepComponent } from 'app/features/anonymization-wizard/components/preprocessing-step/preprocessing-step.component';
import { DatasetService } from 'app/features/datasets/dataset.service';
import { ProjectService } from 'app/features/projects/project.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { Entity } from 'app/core/interfaces/entity.interface';
import { EntityService } from 'app/features/entity/entity.service';

@Component({
  selector: 'app-dataset-detail-page',
  standalone: true,
  imports: [StepperModule, ButtonModule, PreviewStepComponent, PreprocessingStepComponent, RouterLink],
  providers: [MessageService, ProjectService],
  templateUrl: './dataset-detail-page.component.html',
  // template: `<p>dataset-detail-page works!</p>`,
  styleUrl: './dataset-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetDetailPageComponent implements OnInit {
  constructor(
    private datasetService: DatasetService,
    private entityService: EntityService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  projectID: string = '';
  datasetID: string = '';
  datasetInfo: Dataset = {

    name: '',
    project_id: '',
    status: '',
    rows: 0,
    entity: {
      id: '',
      name: ''
    },
    entity_id: '',
    columns: [],
    files: [],
    id: '',
  };

  entities: Entity[] = []
  private index: number = 1;
  private rows: number = 10;
  private preview: [];
  private messageService = inject(MessageService);
  private loading = false;

  ngOnInit(): void {
    // iniciando proceso de carga
    this.loading = true
    this.route.paramMap.subscribe((params) => {
      const projectIDfromUrl = params.get('id');
      const datasetIDfromUrl = params.get('dataset');
      if (!projectIDfromUrl || !datasetIDfromUrl)
        this.router.navigate(['/anonify/home']);

      console.log(
        'El ID de proyecto es:',
        projectIDfromUrl,
        'El ID del dataset es:',
        datasetIDfromUrl
      );
      this.projectID = projectIDfromUrl;
      this.datasetID = datasetIDfromUrl;

      // llamada al la informacion del dataset

      this.datasetService.getDataset(this.datasetID).subscribe({
        next: (res: any) => {
          // console.log("Datos generales del dataset", res);
          this.datasetInfo = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener los datos delm Dataset:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar la informacion del dataset',
          });
        },
      });
      this.entityService.getAllEntities().subscribe({

        next:(res: any)=>{

          this.entities =  res;

          console.log("las entidades son: ", this.entities)
          this.cdr.detectChanges();
        },
        error: (err)=>{

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se pudo cargar la informacion del dataset, ${err}`
          })
        }
      })
    });
    
  }



  navigateTo(event: Event, route: string): void {
    event.preventDefault();
    // console.log('El valor de route es:', route);
    this.router.navigate([route]);
  }

  goToProject(event: Event, projectID): void{
    event.preventDefault();
    this,this.router.navigate(['anonify/projects',projectID])
  }

  onProjectAddedHandler(): void {
    console.log('Evento projectAdded recibido del hijo. Recargando proyectos...');
    // this.loadUserProjects(); // Llama a la función para recargar la lista
  }
}
