import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dataset-detail-page',
  standalone: true,
  imports: [],
  template: `<p>dataset-detail-page works!</p>`,
  styleUrl: './dataset-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetDetailPageComponent { }
