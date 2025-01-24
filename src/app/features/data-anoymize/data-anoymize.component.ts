import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data-anoymize',
  standalone: true,
  imports: [],
  template: `<p>data-anoymize works!</p>`,
  styleUrl: './data-anoymize.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAnoymizeComponent { }
