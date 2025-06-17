import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'app/core/services/file.service';
import { DatasetService } from 'app/features/datasets/dataset.service';
import { MessageService } from 'primeng/api';
import { Card } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'aw-preview-step',
  standalone: true,
  imports: [CommonModule, TableModule, Card, DividerModule],
  providers: [MessageService],
  template: `
    <div class="w-full overflow-x-scroll">
      <div class="w-full h-[45vh] flex justify-center items-center" *ngIf="this.loading">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <p-table
        *ngIf="!this.loading"
        [value]="this.data"
        [paginator]="false"
        [rows]="this.rows"
        [responsiveLayout]="'scroll'"
        selectionMode="single"
        [(selection)]="selectedRows"
        class="w-full h-[400px] overflow-scroll"
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
      <div
        class="w-full h-[70px] flex justify-center items-center"
      >
        <button
          class="mx-3"
          [disabled]="this.index === 1"
          (click)="goToPage($event, 1)"
        >
          <i class="pi pi-angle-double-left"></i>
        </button>
        <button
          class="mx-3"
          [disabled]="this.index === 1"
          (click)="goToPage($event, this.index - 1)"
        >
          <i class="pi pi-angle-left"></i>
        </button>
        <button
          class="rounded-full bg-secondary/15 w-[37px] aspect-square mx-3 text-secondary font-bold"
        >
          {{ this.index }}
        </button>

        <p class="mx-4 font-bold">de</p>
        <p class="mx-4 font-bold">
        {{ this.max_pages }}
        </p>

        
        <button
          class="mx-3"
          [disabled]="this.index === this.max_rows"
          (click)="goToPage($event, this.index + 1)"
        >
          <i class="pi pi-angle-right"></i>
        </button>
        <button
          class="mx-3"
          [disabled]="this.index === this.max_rows"
          (click)="goToPage($event, this.max_pages)"
        >
          <i class="pi pi-angle-double-right"></i>
        </button>
        <select
          class="p-4 rounded-md border-gray-400 bg-primary border-[1px] mx-3"
          (change)="changeMaxRows($event)"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewStepComponent implements OnInit {
  // @Input({required: true}) data = [];
  @Input({ required: true }) datasetID = '';
  @Input({ required: true }) projectID = '';
  // @Input() index: number = 1;
  // @Input() rows: number = 5;
  // @Input() max: number= 10;
  @Output() projectAdded = new EventEmitter<void>();
  // data: any[] = undefined;
  index: number = 1;
  max_pages: number = 1;
  rows: number = 5;
  max_rows: number = 10;
  private cols: any[] = [];
  selectedRows: any[] = [];
  data = [];
  loading = false;

  constructor(
    private datasetService: DatasetService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  // private fileService = inject(FileService);
  // private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    try {
      this.loading = true
      console.log('Preview en componente Tabla:0', this.data);
      // this.data = res.data;
      // this.cdr.markForCheck();
      // this.generateColumns();
      if (this.datasetID == '' || this.projectID == '') {
        this.loading = false;
        return;
      }

      this.datasetService
        .getDatasetPreview(this.datasetID, this.index, this.rows)
        .subscribe({
          next: (res: any) => {
            console.log('Respuesta de PREVIEW:', res);
            this.data = res.preview;
            this.max_pages = res.total_pages;
            console.log('PREVIEW: ', this.data);
            this.generateColumns();
            this.loading =false

            this.cdr.detectChanges();
          },
          error: (err) => {
            this.loading =false
            console.error('Error al obtener los datos del preview:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron cargar los datos del proyecto.',
            });
          },
        });
    } catch (error) {
      this.loading =false
      alert(
        'No se ha cargado el archivo correctamente, y no es posible acceder a la información'
      );
    }
  }

  goToPage(event: Event, next_page: number) {
    event.preventDefault();
    this.loading =true;

    if (next_page < 1) return;

    if (this.datasetID == '' || this.projectID == '') return;

    this.datasetService
      .getDatasetPreview(this.datasetID, next_page, this.rows)
      .subscribe({
        next: (res: any) => {
          console.log('Respuesta de PREVIEW:', res);
          this.data = res.preview;
          this.index = next_page;
          console.log('PREVIEW: ', this.data);
          this.generateColumns();
          this.loading =false;
          this.cdr.detectChanges();
          
        },
        error: (err) => {
          this.loading =false
          console.error('Error al obtener los datos del preview:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos del proyecto.',
          });
        },
      });
  }

  changeMaxRows(event: Event) {
    event.preventDefault();
    this.loading =false

    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    const max_rows = parseInt(valorSeleccionado);
    this.rows = max_rows;

    //


    if (this.datasetID == '' || this.projectID == '') return;

    this.datasetService
      .getDatasetPreview(this.datasetID, 1, this.rows)
      .subscribe({
        next: (res: any) => {
          console.log('Respuesta de PREVIEW:', res);
          this.data = res.preview;
          this.index = res.index;
          this.max_pages = res.total_pages;
          console.log('PREVIEW: ', this.data);
          this.generateColumns();

          this.cdr.detectChanges();
          this.loading =false;
        },
        error: (err) => {
          this.loading =false;
          console.error('Error al obtener los datos del preview:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos del proyecto.',
          });
        },
      });
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['datasetID']) {
  //     console.log(
  //       'Los datos del preview han cambiado:',
  //       changes['datasetID'].currentValue
  //     );

  //     console.log('esta es la data en la TABLA:', this.data);
  //     this.generateColumns();
  //     this.cdr.detectChanges();
  //   }
  // }

  generateColumns(): void {
    if (this.data.length > 0) {
      this.cols = Object.keys(this.data[0]).map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
  }
}
