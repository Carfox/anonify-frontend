import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ReportData } from 'app/core/interfaces/report.interface';
import { AnonymizeService } from 'app/core/services/anonymize.service';
import { MessageService } from 'primeng/api';
import { Card } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'aw-result-step',
  standalone: true,
  imports: [CommonModule, TableModule, Card, DividerModule, ChartModule, PanelModule, ButtonModule],
  providers: [MessageService],
  template: `
    <p-panel header="Reporte de Anonimización">
      <p *ngIf="isLoading">Cargando...</p>
      <div *ngIf="!isLoading">
        <p><strong>Filas:</strong> {{ reportData.num_rows }}</p>
        <p><strong>Columnas:</strong> {{ reportData.num_columns }}</p>

        <p-chart
          *ngFor="let key of objectKeys(reportData.top_values)"
          type="bar"
          [data]="{
            labels: objectKeys(reportData.top_values[key]),
            datasets: [
              {
                label: key,
                data: objectValues(reportData.top_values[key])
              }
            ]
          }"
          [options]="{ responsive: true, maintainAspectRatio: false }"
          style="height: 300px; margin-top: 2rem;"
        ></p-chart>
      </div>
    </p-panel>

    <p-panel header="Vista previa de datos anonimizados" class="mt-4">
      <p-table [value]="previewData">
        <ng-template pTemplate="header">
          <tr>
            <th>Valor</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td>{{ row[0] }}</td>
          </tr>
        </ng-template>
      </p-table>
    </p-panel>

    <p-button
      label="Descargar CSV Anonimizado"
      icon="pi pi-download"
      (onClick)="downloadAnonData()"
      class="mt-4"
    />
  `,
  styles: ``,
})
export class ResultStepComponent {
  reportData!: ReportData;
  previewData: string[][] = [];
  sessionId = localStorage.getItem('sessionID')!;
  private anonymizeService = inject(AnonymizeService);
  isLoading = false;

  ngOnInit() {
    this.loadReport();
    this.loadPreview();
  }

  loadReport() {
    this.isLoading = true;
    this.anonymizeService.getReport(this.sessionId).subscribe({
      next: (res) => {
        this.reportData = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener el reporte', err);
        this.isLoading = false;
      },
    });
  }

  loadPreview() {
    this.anonymizeService.getPreview(this.sessionId).subscribe({
      next: (res) => (this.previewData = res.data),
    });
  }

  downloadAnonData() {
    this.anonymizeService.downloadCSV(this.sessionId).subscribe((blob) => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${this.sessionId}_anon.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
