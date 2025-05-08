import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dataset-card',
  standalone: true,
  imports: [],
  template: `<p>dataset-card works!</p>`,
  styleUrl: './dataset-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetCardComponent { }
