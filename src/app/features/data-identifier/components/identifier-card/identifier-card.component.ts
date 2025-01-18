import { Listbox } from 'primeng/listbox';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Header } from 'app/core/interfaces/header.interface';
import { ToastModule } from 'primeng/toast';
import { IdentifierCallDialogComponent } from '../identifier-call-dialog/identifier-call-dialog.component';
import { FormsModule } from '@angular/forms';
import { IdentifierType } from 'app/core/interfaces/identifierType.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-identifier-card',
  standalone: true,
  imports: [
    ButtonModule,
    Card,
    ToastModule,
    IdentifierCallDialogComponent,
    Listbox,
    FormsModule,
    CommonModule,
  ],
  template: `
    <p-card [header]="identifierType.label">
      <app-identifier-call-dialog
        (selectedDataHeaderEvent)="receiveHeadersData($event)"
        [headersData]="headersData"
        [identifierType]="identifierType"
      ></app-identifier-call-dialog>
      <div *ngIf="headersSelected.length > 0; else noHeaders">
        <p-listbox
          [options]="headersSelected"
          [(ngModel)]="selectedHeader"
          optionLabel="name"
          class="w-full md:w-20"
        />
      </div>
      <ng-template #noHeaders>
        <p class="text-center text-sm p-mb-3">
          No hay identificadores seleccionados
        </p>
      </ng-template>
    </p-card>
  `,
  styleUrl: './identifier-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifierCardComponent  implements OnInit{

  @Input({ required: true }) identifierType: IdentifierType;
  @Input({ required: true }) headersData: Header[];
  public headersSelected: Header[] = [];
  public selectedHeader!: string;

  ngOnInit(): void {
    if(localStorage.getItem(this.identifierType.value)){
      this.headersSelected = JSON.parse(localStorage.getItem(this.identifierType.value) || '{}');
    }
}

  receiveHeadersData(event: any) {

    if(this.headersSelected.length > 0) {
      this.headersSelected = this.headersSelected.concat(event); // Actualizamos los datos recibidos
       localStorage.setItem(
         this.identifierType.value,
         JSON.stringify(this.headersSelected)
       );
    }else{

      this.headersSelected = event; // Actualizamos los datos recibidos
      localStorage.setItem(
        this.identifierType.value,
        JSON.stringify(this.headersSelected)
      );

    }
  }
}
