import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `<p>data-identifier works!</p>`,
  styleUrl: './data-identifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataIdentifierComponent { }
