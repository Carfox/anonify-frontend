import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PickList } from 'primeng/picklist';
import { CommonModule } from '@angular/common';
import { Header } from 'app/core/interfaces/header.interface';
import { Button } from 'primeng/button';
@Component({
  selector: 'data-identifier-picklist',
  standalone: true,
  imports: [PickList, CommonModule, Button],
  template: `
    <p-picklist
      [source]="headers"
      [target]="targetOption"
      [dragdrop]="false"
      [responsive]="true"
      [sourceStyle]="{ height: '10rem', weight: '10px' }"
      [targetStyle]="{ height: '10rem', weight: '10px'  }"
      filterBy="name"
      sourceFilterPlaceholder="Buscar Identificador"
      targetFilterPlaceholder="Buscar Identificador"
      breakpoint="1400px"
      scrollHeight="10rem"
    >
      <ng-template let-option let-selected="selected" pTemplate="option">
        {{ option.name }}
      </ng-template>
    </p-picklist>
    <p-button (onClick)="saveSelection()">Guardar</p-button>
  `,
  styleUrl: './identifier-picklist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifierPicklistComponent {
  @Input({ required: true }) headers: Header[];
  @Output() pickListEmitter = new EventEmitter<string>();
  public targetOption: Header[] = [];
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.cdr.markForCheck();
    this.targetOption = [];
  }
  saveSelection(): void {
    console.log('Guardando selección');
    this.sendData();
  }
  sendData(): void {
    this.pickListEmitter.emit(JSON.stringify(this.targetOption));
  }
}
