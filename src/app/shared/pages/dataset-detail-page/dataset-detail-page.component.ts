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
import { AuthService } from 'app/features/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ResultStepComponent } from 'app/features/anonymization-wizard/components/result-step.component';
import { AnonymizeStepComponent } from 'app/features/anonymization-wizard/components/anonymize-step.component';
import { IdentifiersStepComponent } from 'app/features/anonymization-wizard/components/identifiers-step/identifiers-step.component';
import { PreprocessViewStepComponent } from 'app/features/anonymization-wizard/components/preprocess-view-step';

@Component({
  selector: 'app-dataset-detail-page',
  standalone: true,
  imports: [StepperModule, ButtonModule, PreviewStepComponent, PreprocessViewStepComponent,PreprocessingStepComponent, RouterLink, CommonModule,  IdentifiersStepComponent,
      AnonymizeStepComponent,
      ResultStepComponent,
      RouterLink,],
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
    private router: Router,
    protected authService: AuthService
  ) {}
  projectID: string = '';
  datasetID: string = '';
  datasetInfo: Dataset = {

    name: '',
    project_id: '',
    status: '',
    // rows: 0,
    entity: {
      id: '',
      name: ''
    },
    entity_id: '',
    // columns: [],
    files: [],
    id: '',
  };

  entities: Entity[] = []
  private index: number = 1;
  private rows: number = 10;
  private preview: [];
  private preview_preprosess: [];

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
            life: 3000
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
            detail: `No se pudo cargar la informacion del dataset, ${err}`,
            life: 3000
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

  setDataFlowPage(): number{

    const test_value = this.datasetInfo.status

    if(test_value == "uploaded")return 1
    if(test_value== "edited")return 2
    if(test_value == "preprocessed" || test_value == "no_preprocessed")return 3
    if(test_value == "anonimized")return 5

    return 1

  }
  
}
