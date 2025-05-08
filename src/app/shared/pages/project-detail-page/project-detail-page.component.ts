import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatasetsComponent } from "../../../features/datasets/datasets.component";

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [DatasetsComponent],
  template: `<datasets></datasets>`,
  styleUrl: './project-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent { }
