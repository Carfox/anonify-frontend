import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'datasets',
  standalone: true,
  imports: [],
  template: `
  
  
  <p>datasets works!</p>`,
  styleUrl: './datasets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetsComponent { }
