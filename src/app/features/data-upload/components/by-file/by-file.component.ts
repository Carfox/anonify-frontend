import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  constructor(private messageService: MessageService) {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
