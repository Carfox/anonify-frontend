import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'app/shared/services/data-sharing.service';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { FileUpload, } from 'primeng/fileupload';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { Toast, ToastModule } from 'primeng/toast';
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
    HttpClientModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './by-file.components.html',
  styleUrl: './by-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByFileComponent {
  uploadedFiles: any[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService) {}
  private dataSharingService = inject(DataSharingService);

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log('archivo cargado', event.files[0]);
    this.dataSharingService.updateTable(this.uploadedFiles[0]);

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
