import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IdentifierPicklistComponent } from '../identifier-picklist/identifier-picklist.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Header } from 'app/core/interfaces/header.interface';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  providers: [DialogService, MessageService],
  imports: [CommonModule, ButtonModule, IdentifierPicklistComponent],
  template: `
        <p class="text-center text-sm p-mb-3">
          Mueva los identificadores al cuadro de la derecha para categorizarlos.
        </p>

        <data-identifier-picklist
          [headers]="headersData"
          (pickListEmitter)="saveSelection($event)"
        ></data-identifier-picklist>

        <p-button
          type="button"
          label="Cerrar"
          (onClick)="close()"
          class="p-button-rounded p-button-secondary"
        ></p-button>

  `,
})
export class IdentifierDialogComponent {
  public headersData: Header[] = [];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.headersData = config.data.headersData;
  }

  saveSelection(event: any) {
    console.log('Guardando selección', event);
    this.sendData(JSON.parse(event));
  }

  sendData(selectedData: Header[]) {
    this.ref.close(selectedData);
  }

  close() {
    this.ref.close();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
