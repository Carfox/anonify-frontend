import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataSharingService } from 'app/shared/services/data-sharing.service';
import { Card } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  standalone: true,
  imports: [CommonModule, TableModule, Card, DividerModule],
  templateUrl: `./data-preview.component.html`,
  styleUrl: './data-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPreviewComponent implements OnInit {
  data: any[] = [];
  cols: any[] = [];
  selectedRows: any[] = [];

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    try {
      if (localStorage.getItem('data')) {
        this.data = JSON.parse(localStorage.getItem('data'));
        this.generateColumns();
      }
    } catch (error) {
      alert('Error loading data');
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

  exportToCSV(): void {
    const csvData = this.data.map((row) => {
      const selected = this.selectedRows.some(
        (selectedRow) => selectedRow.id === row.id
      );
      return { ...row, Selected: selected ? 'Yes' : 'No' };
    });
    const csvContent = this.arrayToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  arrayToCSV(data: any[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => row[header] || '').join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
