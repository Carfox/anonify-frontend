import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { AnonymizeService } from 'app/core/services/anonymize.service';
import { Card } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'aw-anonymize-step',
  standalone: true,
   imports: [CommonModule, TableModule, Card, DividerModule],
      template: `
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
  styles: ``
})
export class AnonymizeStepComponent {

      data: any[] = undefined;
        cols: any[] = [];
        selectedRows: any[] = [];

        private anonymizeService = inject(AnonymizeService);
        private cdr = inject(ChangeDetectorRef);

      ngOnInit(): void {
        try {
          this.anonymizeService
          .getPreview(localStorage.getItem('sessionID'))
          .subscribe((res: any) => {
            console.log(res);
            this.data = res.data;
            this.cdr.markForCheck();
            this.generateColumns();
          });
        } catch (error) {
          alert('No se ha cargado el archivo correctamente, y no es posible acceder a la información');
        }

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
