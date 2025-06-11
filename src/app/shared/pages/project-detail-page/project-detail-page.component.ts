import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { DatasetsComponent } from '../../../features/datasets/datasets.component';
import { Dialog } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FileService } from 'app/core/services/file.service';
import { ProjectService } from 'app/features/projects/project.service';
import { routes } from 'app/app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'app/core/interfaces/project.interface';
import { Dataset } from 'app/core/interfaces/dataset.interface';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'app/core/services/websocket.service';
// import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';
// import { WebSocketMessage } from 'app/core/interfaces/websocket.interface';
import { WebSocketMessage } from 'app/core/interfaces/websocket.interface';
import { DataUploadService } from 'app/features/data-upload/data-upload.service';
// Asegúrate de tener estas interfaces

// interface ParsedColumnInfo {
//   name: string;
//   detectedType: string; // 'string', 'number', 'boolean', 'uuid', etc.
//   // Podrías añadir un 'actualTypeId' para el backend si tienes un mapeo
// }

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    DatasetsComponent,
    Dialog,
    CommonModule,
    TabsModule,
    FileUpload,
    ButtonModule,
    BadgeModule,
    ToastModule,
    CardModule,
  ],
  providers: [MessageService, ProjectService],
  // template: `<datasets></datasets>`,
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent implements OnInit {
  constructor(
    private webSocketService: WebSocketService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataUploadService: DataUploadService, // Inyección de ActivatedRoute
    private router: Router // Inyección de Router
    
  ) {}

  // parsedColumns: ParsedColumnInfo[] = [];

  uploadedFiles: File[] = [];
  upload_dialog_visible: boolean = false;
  projectID: string = '';
  projectData: Project = {
    id: '',
    title: '',
    description: '',
    datasets: [],
    // create
    // d_at: '',
    // updated_at: '',
  };
  selectedFile: File | null = null;
  datasetToUploadInfo: Dataset = null; // Variable para almacenar la información del dataset a subir
  errorMessage: string | null = null;
  public showUploadProgress: boolean = false;
  public uploadProgress: number = 0;
  public uploadStatus: string = 'Inactivo';
  public uploadMessage: string = '';
  private websocketSubscription: Subscription | null = null;

  private messageService = inject(MessageService);

  

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      // 'id' es el nombre del parámetro en la configuración de tu ruta
      const projectIdFromUrl = params.get('id');
      if (projectIdFromUrl) {
        this.projectID = projectIdFromUrl;
        console.log('Project ID desde la URL:', this.projectID);
        // Aquí podrías querer cargar datos específicos de este proyecto
        // O si tu servicio getUserProjects ya maneja el filtro por ID, pasárselo.
      } else {
        console.warn('No se encontró Project ID en la URL.');
        this.projectID = null;
      }
    });

    

    // obtencion de datos del proyecto
    this.projectService.getProjectById(this.projectID).subscribe({
      next: (res: any) => {
        console.log('Datos del proyecto obtenidos:', res);
        // Aquí podrías manejar los datos del proyecto, por ejemplo, asignarlos a una variable
        this.projectData = res;
        this.cdr.detectChanges();
        console.log('Project Info:', this.projectData);
        // Forzar la detección de cambios para actualizar la vista
      },
      error: (err) => {
        console.error('Error al obtener los datos del proyecto:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos del proyecto.',
        });
      },
    });

    // this.cdr.detectChanges();

    // Aquí podrías cargar datos iniciales si es necesario
  }

  navigateTo(event: Event, route: string): void {
    event.preventDefault();
    // console.log('El valor de route es:', route);
    this.router.navigate([route]);
  }
  ngOnChanges() {
    // Este método se ejecuta cuando hay cambios en las propiedades del componente
    // Puedes usarlo para manejar cambios en las propiedades que afectan la vista
    // console.log('ngOnChanges ejecutado');
    // this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    // ... Desuscripción y cierre de WebSocket al destruir el componente
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    this.webSocketService.close();
  }

  // Tu función para conectar al WebSocket (la misma que ya tienes)
  connectToUploadProgressWebSocket(operationId: string): void {
    // ... (El código de esta función es idéntico al que te proporcioné anteriormente) ...

    const wsUrl = `ws://localhost:2003/api/ws/progress/${operationId}`;
    console.log('Conectando al WebSocket en:', wsUrl);
    this.showUploadProgress = true;
    this.uploadProgress = 0;
    this.uploadStatus = 'Conectando...';
    this.uploadMessage = 'Esperando progreso del servidor.';

    if (this.websocketSubscription) {

      console.log('Desconectando WebSocket anterior antes de conectar uno nuevo.');
      this.websocketSubscription.unsubscribe();
    }
    // Cerrar cualquier conexión WebSocket anterior antes de abrir una nueva
    console.log('Cerrando WebSocket anterior si existe.');
    this.webSocketService.close();

    console.log('Conectando al WebSocket en:', wsUrl);

    this.websocketSubscription = this.webSocketService
      .connect(wsUrl)
      .subscribe({
        next: (message: WebSocketMessage) => {
          // ... Lógica para actualizar progreso, estado, mensaje ...
          console.log('Mensaje recibido del WebSocket:', message);
          if (message.progress !== undefined) {
            this.uploadProgress = message.progress;
          }
          if (message.status) {
            this.uploadStatus = message.status;
          }
          if (message.message) {
            this.uploadMessage = message.message;
          }

          if (this.uploadProgress === 100 || message.error) {
            this.uploadStatus = message.error ? 'Error' : 'Completado';
            this.uploadMessage = message.error || 'Carga finalizada.';

            this.webSocketService.close();
            console.log('Cerrando conexión WebSocket.');
            if (this.websocketSubscription) {
              this.websocketSubscription.unsubscribe();
            }
            // Si quieres recargar los proyectos después de una carga exitosa:
            if (this.uploadProgress === 100) {
              // this.loadUserProjects(); // Recarga la lista de proyectos si la operación lo justifica
            }
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          // ... Lógica de manejo de error ...
          console.error('Error del WebSocket:', err);
          this.uploadStatus = 'Error';
          this.uploadMessage =
            'Fallo en la conexión o comunicación con el servidor.';
          this.uploadProgress = 0;
          this.cdr.detectChanges();
        },
        complete: () => {
          // ... Lógica al completar la conexión ...
          console.log('Conexión WebSocket completada.');
          this.uploadStatus = 'Completado (Desconectado)';
          this.uploadMessage = 'Flujo de progreso finalizado.';
          this.cdr.detectChanges();
        },
      });
  }
  resetUploadProgress(): void {
    this.showUploadProgress = false;
    this.uploadProgress = 0;
    this.uploadStatus = 'Inactivo';
    this.uploadMessage = '';
    this.webSocketService.close();
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
      this.websocketSubscription = null;
    }
    this.cdr.detectChanges();
  }

  onUploadv2(event: any) {
    const file = event.files[0];
    if (!file) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se seleccionó ningún archivo.',
      });
      return;
    }
    
    this.dataUploadService.uploadData(file, this.projectID).subscribe(
        (response: any) => {
          const operationId = response.operation_id; // Asegúrate de que tu backend retorne un ID de operación
          console.log('Respuesta del backend:', response);
          if (operationId) {
            console.log('ID de operación recibido:', operationId);
           this.connectToUploadProgressWebSocket(operationId);

           this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Archivo subido correctamente. Seguimiento de carga iniciado.',
          });
         } else {
          
           this.uploadStatus = 'Error';
          
            console.error('El backend no devolvió un ID de operación.');
           this.errorMessage = 'El backend no devolvió un ID de operación para el seguimiento.';
           this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en la comunicación con el servidor.',
          });
         }

          
          // if (event.type === 1) { 
          //   const percentDone = Math.round(100 * event.loaded / event.total);
          //   console.log(`Cargando archivo: ${percentDone}%`);
            
          // } else if (event.type === 4) { 
          //   console.log('Archivo cargado con éxito:', event.body);
          //   this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Archivo subido correctamente.'});
            
          // }
        }
      );

  }

  
  private parseCsvLine(line: string): string[] {
    // Una expresión regular simple para CSV, considera usar una librería para casos complejos
    // Esto es un ejemplo. Librerías como 'papaparse' son mejores para CSV real.
    const regex = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^,\"]*))(?:,|$)/g;
    let match;
    const result: string[] = [];
    while ((match = regex.exec(line)) !== null) {
      // Si el valor está entre comillas, elimina las comillas y reemplaza "" por "
      const value =
        match[1] !== undefined ? match[1].replace(/\"\"/g, '"') : match[2];
      result.push(value.trim()); // trim para quitar espacios
    }
    return result;
  }

  // private detectColumnTypes(headers: string[], sampleLines: string[]): void {
  //   if (sampleLines.length === 0) {
  //     console.warn(
  //       "No hay líneas de muestra para detectar tipos, todas las columnas serán 'string'."
  //     );
  //     return;
  //   }

  //   const columnValues: { [key: string]: string[] } = {};
  //   headers.forEach((header) => (columnValues[header] = []));

  //   sampleLines.forEach((line) => {
  //     const values = this.parseCsvLine(line);
  //     headers.forEach((header, index) => {
  //       if (values[index] !== undefined) {
  //         columnValues[header].push(values[index]);
  //       }
  //     });
  //   });

  //   this.parsedColumns = headers.map((header) => {
  //     const values = columnValues[header];
  //     const detectedType = this.inferType(values);
  //     return { name: header, detectedType: detectedType };
  //   });
  // }

  // private inferType(values: string[]): string {
  //   let allAreNumbers = true;
  //   let allAreBooleans = true;
  //   let allAreUUIDs = true; // Nuevo tipo
  //   let hasValues = false;

  //   for (const val of values) {
  //     if (val === null || val === undefined || val.trim() === '') {
  //       continue; // Ignorar valores vacíos para la inferencia
  //     }
  //     hasValues = true;

  //     // Intentar Number
  //     if (isNaN(Number(val))) {
  //       allAreNumbers = false;
  //     }

  //     // Intentar Boolean
  //     const lowerVal = val.toLowerCase();
  //     if (!['true', 'false', '1', '0'].includes(lowerVal)) {
  //       allAreBooleans = false;
  //     }

  //     // Intentar UUID (regex básica, puede ser más estricta si necesitas)
  //     const uuidRegex =
  //       /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  //     if (!uuidRegex.test(val)) {
  //       allAreUUIDs = false;
  //     }

  //     // Si ya sabemos que no es ninguno de los tipos específicos, podemos salir temprano
  //     if (!allAreNumbers && !allAreBooleans && !allAreUUIDs) {
  //       break;
  //     }
  //   }

  //   if (!hasValues) {
  //     return 'string'; // O 'unknown' si prefieres, para columnas vacías
  //   } else if (allAreNumbers) {
  //     return 'number';
  //   } else if (allAreBooleans) {
  //     return 'boolean';
  //   } else if (allAreUUIDs) {
  //     // Priorizar UUID si es detectado
  //     return 'uuid';
  //   } else {
  //     return 'string'; // Por defecto, si no es nada de lo anterior
  //   }
  // }

  isDataLoaded(): boolean {
    return !!localStorage.getItem('sessionID'); // Verifica si hay un sessionID en el localStorage
  }

  changeUploadState() {
    if (this.upload_dialog_visible) {
      this.upload_dialog_visible = false;

      this.cdr.detectChanges();
      // this.uploadedFiles = [];
      // Emitir el evento para notificar al padre
    } else {
      this.upload_dialog_visible = true;
      this.cdr.detectChanges();
    }
  }
}
