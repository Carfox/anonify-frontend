import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';

import { FileDataSharedService } from 'app/core/services/file-data-shared.service';
import { FileService } from 'app/core/services/file.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'aw-upload-step',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    FileUpload,
    ButtonModule,
    BadgeModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="card">
      <p-tabs value="0">
        <p-tablist>
          <p-tab value="0">Cargar por CSV</p-tab>
          <p-tab value="1">Datos Previos</p-tab>
        </p-tablist>
        <p-tabpanels>
          <p-tabpanel value="0">
            <div
              class="flex flex-column justify-content-center align-items-center p-4"
            >
              <span class="flex text-muted text-center mb-3"
                >Selecciona un archivo y presiona en "Cargar" para
                subirlo.</span
              >
              <div class="card p-4 surface-card shadow-2 border-round w-full">
                <p-toast />
                <p-fileupload
                  name="file"
                  url="http://127.0.0.1:8000/files/upload-csv"
                  (onUpload)="onUploadNG($event)"
                  [multiple]="false"
                  accept=".csv, .txt"
                  maxFileSize="1000000"
                  mode="advanced"
                  chooseLabel="Seleccionar archivo"
                  uploadLabel="Cargar"
                >
                  <ng-template #empty>
                    <div>Drag and drop files to here to upload.</div>
                  </ng-template>
                  <ng-template #content>
                    <ul *ngIf="uploadedFiles.length">
                      <li *ngFor="let file of uploadedFiles">
                        {{ file.name }} - {{ file.size }} bytes
                      </li>
                    </ul>
                  </ng-template>
                </p-fileupload>
              </div>
            </div>
          </p-tabpanel>
          <p-tabpanel value="1">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </div>
  `,
  styles: ``,
})
export class UploadStepComponent {
  uploadedFiles: File[] = [];

  private fileService = inject(FileService);
  private messageService = inject(MessageService);

  // TODO: Refactorizar el servicio de carga de archivos para que use el antiguo y avise el cuando no se haya subido el archivo

  // onUpload(event: any) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //     this.fileService.postUploadFile(file).subscribe(
  //       (response: any) => {
  //         console.log('Upload successful', response);
  //         localStorage.setItem('data', JSON.stringify(response.data));
  //         this.messageService.add({
  //           severity: 'info',
  //           summary: 'File Uploaded',
  //           detail: `${file.name} uploaded successfully, ${response.data.length} rows added`,
  //         });
  //       },
  //       (error) => {
  //         console.error('Upload failed', error);
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'File Upload Failed',
  //           detail: error.message,
  //         });
  //       }
  //     );
  //   }
  // }

  onUploadNG(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Carga de archivo',
      detail: `${event.files[0].name} cargado correctamente`,
    });

    // this.fileDataSharedService.updateSession(event.originalEvent.body.data.session_id);
    localStorage.setItem(
      'sessionID',
      event.originalEvent.body.data.session_id
    );

  }

  isDataLoaded(): boolean {
    return !!localStorage.getItem('sessionID'); // Verifica si hay un sessionID en el localStorage
  }

}
