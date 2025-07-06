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
import { DatasetService } from 'app/features/datasets/dataset.service';
import Swal from 'sweetalert2';

import { environment } from 'environments/environment.development';
import { AuthService } from 'app/features/auth/auth.service';
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
    private router: Router, // Inyección de Router
    private datasetService: DatasetService,
    protected authService: AuthService
  ) {}

  // parsedColumns: ParsedColumnInfo[] = [];

  uploadedFiles: File[] = [];
  upload_dialog_visible: boolean = false;
  projectID: string = '';
  projectData: Project = {
    id: '',
    title: '',
    authors: [],
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
          detail: `No se pudieron cargar los datos del proyecto. ${err}`,
          life: 3000,
        });
      },
    });
  }

  navigateTo(event: Event, route: string): void {
    event.preventDefault();
    // console.log('El valor de route es:', route);
    this.router.navigate([route]);
  }

  onDeleteDataset(event: Event, dataset_id: string) {
    event.preventDefault();

    console.log('ID del dataset:', dataset_id);
    Swal.fire({
      title:
        'Estas seguro que deseas eliminar toda la información del dataset?',
      // showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#F77070',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',

      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.datasetService.deleteDataset(dataset_id).subscribe({
          next: (res: any) => {
            console.log('Respuesta del servidor:', res);

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
                  detail: `No se pudieron cargar los datos del proyecto.${err}`,
                  life: 3000,
                });
              },
            });
          },
          error: (err) => {
            console.error('error al eliminar el dataset', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:  `ocurrio un error al intentar eliminar el  ${err}`,
              life: 3000,
            });
          },
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail:
            'El dataset y todos sus datos han sido eliminados correctamente.',
          life: 3000,
        });
        // Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  onDatasetInfo(event: Event, dataset_id: string) {
    event.preventDefault();
    console.log('este es el id del dataset:', dataset_id);
    this.router.navigate(['anonify/projects', this.projectID, dataset_id]);
  }
  onDeleteProject(projectID: string) {
      Swal.fire({
        title:
          'Estas seguro que deseas eliminar toda la información del Proyecto?',
        // showDenyButton: true,
        icon: 'warning',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#F77070',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
  
        // denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.projectService.deleteProjectById(projectID).subscribe({
            next: (res: any) => {
              console.log('Respuesta del servidor', res);
              // this.getAllProjects();

              this.router.navigate(['anonify/projects']);

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'El Proyecto se ha eliminado correctamente',
                life: 3000,
              });
            },
            error: (err) => {
              console.error('Error al eliminar el servicio', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el proyecto.',
                life: 3000,
              });
            },
          });
        }
      })
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

    this.showUploadProgress = true

    const wsUrl = `${environment.webSocketUrl}${operationId}`;
    console.log('Conectando al WebSocket en:', wsUrl);
    this.showUploadProgress = true;
    this.uploadProgress = 0;
    this.uploadStatus = 'Conectando...';
    this.uploadMessage = 'Esperando progreso del servidor.';

    if (this.websocketSubscription) {
      console.log(
        'Desconectando WebSocket anterior antes de conectar uno nuevo.'
      );
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

  closeUploadDialog(){
    this.upload_dialog_visible = false
  }


  onUploadv2(event: any) {
    const file = event.files[0];
    if (!file) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se seleccionó ningún archivo.',
        life: 3000,
      });
      return;
    }

    this.dataUploadService
      .uploadData(file, this.projectID)
      .subscribe((response: any) => {
        const operationId = response.operation_id; // Asegúrate de que tu backend retorne un ID de operación
        console.log('Respuesta del backend:', response);
        if (operationId) {
          console.log('ID de operación recibido:', operationId);
          this.connectToUploadProgressWebSocket(operationId);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail:
              'Archivo subido correctamente. Seguimiento de carga iniciado.',
            life: 3000,
          });
        } else {
          this.uploadStatus = 'Error';

          console.error('El backend no devolvió un ID de operación.');
          this.errorMessage =
            'El backend no devolvió un ID de operación para el seguimiento.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en la comunicación con el servidor.',
            life: 3000,
          });
        }

        // if (event.type === 1) {
        //   const percentDone = Math.round(100 * event.loaded / event.total);
        //   console.log(`Cargando archivo: ${percentDone}%`);

        // } else if (event.type === 4) {
        //   console.log('Archivo cargado con éxito:', event.body);
        //   this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Archivo subido correctamente.'});

        // }
      });
  }

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
