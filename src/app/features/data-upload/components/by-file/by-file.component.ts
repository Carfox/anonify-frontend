import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'app/shared/services/data-sharing.service';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUpload, } from 'primeng/fileupload';
import { ProgressBar } from 'primeng/progressbar';
import {ToastModule } from 'primeng/toast';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-by-file',
  standalone: true,
  imports: [
    FileUpload,
    ButtonModule,
    BadgeModule,
    ProgressBar,
    ToastModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './by-file.components.html',
  styleUrl: './by-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByFileComponent {
  uploadedFiles: any[] = [];

  constructor(private router: Router, private messageService: MessageService) {}
  private dataSharingService = inject(DataSharingService);

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log('archivo cargado', event.files[0]);
    this.dataSharingService.updateTable(event.files[0]);

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  goToPreview() {
    this.router.navigate(['/a/preview']);
  }
}
