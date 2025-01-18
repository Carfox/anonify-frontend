import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IdentifierDialogComponent } from '../identifier-dialog/identifier-dialog.component';
import { Header } from 'app/core/interfaces/header.interface';
import { IdentifierType } from 'app/core/interfaces/identifierType.interface';

@Component({
  selector: 'app-identifier-call-dialog',
  standalone: true,
  providers: [DialogService, MessageService],
  imports: [ToastModule, Button, DynamicDialog],
  template: `
      <p-toast />
      <p-button
        (click)="show()"
        icon="pi pi-plus"
        label="Agregar Identificadores"
      />
  `,
  styleUrl: './identifier-call-dialog.component.css',
})
export class IdentifierCallDialogComponent {
  @Input({required: true}) headersData: Header[];
  @Input({required: true}) identifierType: IdentifierType;
  @Output() selectedDataHeaderEvent = new EventEmitter<Header[]>();
  ref: DynamicDialogRef | undefined;
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  show() {
    console.log('this call dialog', this.headersData);
    this.ref = this.dialogService.open(IdentifierDialogComponent, {
      header: 'Seleccione los identificadores',
      width: '90%',
      height: '90%',
      modal: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { headersData: this.headersData },
    });

    this.ref.onClose.subscribe((headersSelected: Header[]) => {
      if (headersSelected) {
        for (let header of headersSelected) {
          this.messageService.add({
            severity: 'info',
            summary: 'Se agregado el identificador',
            detail: header.name,
          });
          header.identifierType = this.identifierType.value;
        }
        this.selectedDataHeaderEvent.emit(headersSelected);
      }
    });
  }
}
