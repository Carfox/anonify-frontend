import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dataset-page',
  standalone: true,
  imports: [],
  template: `Hola Mundo`,
  styleUrl: './dataset-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetPageComponent { }
