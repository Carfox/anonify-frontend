import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dataset-detail',
  standalone: true,
  imports: [],
  template: `<p>dataset-detail works!</p>`,
  styleUrl: './dataset-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetDetailComponent { }
