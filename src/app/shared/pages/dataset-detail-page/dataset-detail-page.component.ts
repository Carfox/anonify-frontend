import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dataset } from 'app/core/interfaces/dataset.interface';
import { PreviewStepComponent } from 'app/features/anonymization-wizard/components/preview-step.component';
import { DatasetService } from 'app/features/datasets/dataset.service';
import { ProjectService } from 'app/features/projects/project.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-dataset-detail-page',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    PreviewStepComponent,
    RouterLink
  ],
  providers: [MessageService, ProjectService],
  templateUrl: './dataset-detail-page.component.html',
  // template: `<p>dataset-detail-page works!</p>`,
  styleUrl: './dataset-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetDetailPageComponent implements OnInit{
  constructor(
    private datasetService: DatasetService,
    private cdr: ChangeDetectorRef,

  ){}
  datasetInfo: Dataset = {
    name: "",
    project_id: "",
    query_id: "",
    columns: [],
    files: [],
    id: '',
  }

  ngOnInit(

  ): void{

  }


}
