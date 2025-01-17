import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './data-identifier.component.html',
  styleUrl: './data-identifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataIdentifierComponent {}
