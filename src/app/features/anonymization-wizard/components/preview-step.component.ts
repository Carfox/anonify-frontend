import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FileService } from 'app/core/services/file.service';
import { Card } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'aw-preview-step',
  standalone: true,
  imports: [CommonModule, TableModule, Card, DividerModule],
  template: `
    <p-divider />
    <p>
      Seleccione los respectivos tipos de identificadores a los que pertenece
      cada atributo
    </p>

    <p-table
      [value]="data"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [responsiveLayout]="'scroll'"
      selectionMode="single"
      [(selection)]="selectedRows"
    >
      <!-- Checkbox Column -->
      <ng-template pTemplate="header">
        <tr>

          <th *ngFor="let col of cols" style="width: 3%">
            {{ col.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
          <td *ngFor="let col of cols">
            {{ rowData[col.field] }}
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
})
export class PreviewStepComponent implements OnInit {
  data: any[] = [];
  cols: any[] = [];
  selectedRows: any[] = [];

  private fileService = inject(FileService);

  ngOnInit(): void {
    // try {

    this.data = this.fileService.loadOriginalFileData(
      localStorage.getItem('sessionID')
    );
    this.generateColumns();

    // } catch (error) {
    //   alert('Error loading data');
    // }
  }

  generateColumns(): void {
    if (this.data.length > 0) {
      this.cols = Object.keys(this.data[0]).map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
  }
}
