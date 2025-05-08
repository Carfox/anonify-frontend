import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DataSharingService } from 'app/shared/services/data-sharing.service';
import { FileService } from 'app/core/services/file.service';
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
  private fileService = inject(FileService);
  private dataSharingService = inject(DataSharingService);

  onUpload(event: any) {
    for (let file of event.files) {
      this.fileService.postUploadFile(file).subscribe(
        (response: any) => {
          console.log('Upload successful', response);
          localStorage.setItem('data', JSON.stringify(response.data));
          this.messageService.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: `${file.name} uploaded successfully, ${response.data.length} rows added`,
          });
        },
        (error) => {
          console.error('Upload failed', error);
          this.messageService.add({
            severity: 'error',
            summary: 'File Upload Failed',
            detail: error.message,
          });
        }
      );
    }
  }

  goToPreview() {
    this.router.navigate(['/a/preview']);
  }
}
