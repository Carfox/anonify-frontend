import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dataset } from 'app/core/interfaces/dataset.interface';
import { Entity } from 'app/core/interfaces/entity.interface';
import { WebSocketMessage } from 'app/core/interfaces/websocket.interface';
import { WebSocketService } from 'app/core/services/websocket.service';
import { environment } from 'environments/environment.development';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import DatasetPreprocess from './preprocess.interface';
import { PreprocessService } from './preprocess.service';

@Component({
  selector: 'aw-preprocessing-step',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule],
  providers: [MessageService],
  templateUrl: './preprocessing-step.component.html',
  styleUrl: './preprocessing-step.component.css',
})
export class PreprocessingStepComponent {
  @Input({ required: true }) datasetID = '';
  @Input({ required: true }) projectID = '';
  @Input({ required: true }) dataset: Dataset;
  @Input({ required: true }) entities = [];

  @Output() preprocessingData = new EventEmitter<void>();

  // ngOnInit(): void {

  //   // console.log("Info dentro de preprocesing step", this.projectID,this.datasetID, this.entities)

  // }

  selectedEntity: Entity;
  needPreprocessing: boolean = true;
  cleanMode: number = 1;
  preprocessingStatus: string = 'Inactivo';
  preprocessingProgress: number = 0;
  outMessage: string = 'SALIDA:';
  showProgress: boolean = true;
  infoToSend: DatasetPreprocess;

  private websocketSubscription: Subscription | null = null;
  // private messageService = inject(MessageService);

  constructor(
    private webSocketService: WebSocketService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private preprocessService: PreprocessService
  ) {}
  // funciones para websocket

  ngOnDestroy(): void {
    // ... Desuscripción y cierre de WebSocket al destruir el componente
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    this.webSocketService.close();
  }

  connectToPreprocessWebSocket(operationId: string): void {
    const wsUrl = `${environment.webSocketUrl}${operationId}`;
    console.log('Conectando al Websocket en: ', wsUrl);
    // this.showProgress = true;
    this.preprocessingProgress = 0;
    this.preprocessingStatus = 'Conectando...';
    this.outMessage += '\nEsperando progreso del servidor.';

    // desconexion
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
          console.log('Mensaje recibido del WebSocket:', message);
          if (message.progress !== undefined) {
            this.preprocessingProgress = message.progress;
          }
          if (message.status) {
            this.preprocessingStatus = message.status;
          }
          if (message.message) {
            this.outMessage += '\n' + message.message;
          }
          if (this.preprocessingProgress === 100 || message.error) {
            this.preprocessingStatus = message.error ? 'Error' : 'Completado';
            this.outMessage += message.error ? `\n${message.error}` : '\nPreprocesamiento Finalizado.';
            this.webSocketService.close();
            console.log('Cerrando conexión WebSocket.');
            if (this.websocketSubscription) {
              this.websocketSubscription.unsubscribe();
            }
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error en Websocket', err);
          this.preprocessingStatus = 'Error';
          this.outMessage +=  'Fallo en la conexión o comunicación con el servidor.';
          this.preprocessingProgress = 0;
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('Conexion WebSocket Completada.');
          this.preprocessingStatus = 'Completado (Desconectado)';
          this.outMessage = 'Flujo de progreso finalizado.';
          this.cdr.detectChanges();
        },
      });
  }

  // fin funciones para websocket
  onSubmitPreprocessing(event: Event) {
    event.preventDefault();
    //TODO
    this.infoToSend = {
      projectID: this.projectID,
      datasetID: this.datasetID,
      parameters: {
        dataset_status: this.dataset.status,
        need_preprocess: this.needPreprocessing,
        need_imputation: true,
        cleaning_method: 'imputation',
        columns: this.dataset.files[0].columns,
        rows: this.dataset.files[0].rows,
      },
    };

    console.log('info a enviar', this.infoToSend);

    this.preprocessService
      .preprocessData(this.infoToSend)
      .subscribe((res: any) => {
        const operationID = res.operation_id;
        console.log('Respuesta del backend:', res);
        if (operationID) {
          console.log('ID de operación recibido:', operationID);

          this.connectToPreprocessWebSocket(operationID);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail:
              'Archivo subido correctamente. Seguimiento de carga iniciado.',
            life: 3000,
          });
        }
        else{

          this.preprocessingStatus = 'Error';

          console.error('El backend no devolvió un ID de operación.');
          this.outMessage +='El backend no devolvió un ID de operación para el seguimiento.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en la comunicación con el servidor.',
            life: 3000,
          });
        }
      });

    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'se ha iniciado el proceso de preprocesamiento en el servidor',
      life: 3000,
    });
  }
  showAdvancedOptions(event: Event) {
    event.preventDefault();
    console.log('Mostrando opciones avanzadas');

    // const id = event.currentTarget.id.split("-").pop();

    // console.log("id", id);

    const content = document.getElementById(`accordion-open-body-1`);

    console.log('content', content);

    if (!content) return;

    // despues de cerrados los demas acordiones abrir el que se clickeo

    // Toggle the content's max-height for smooth opening and closing
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0';
      // icon.innerHTML = plusSVG;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      // icon.innerHTML = minusSVG;
    }
  }

  resetUploadProgress() {
    // this.showProgress = false;

    this.preprocessingProgress = 0;
    this.preprocessingStatus = 'Inactivo';
    this.outMessage = '';
    this.webSocketService.close();

    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
      this.websocketSubscription = null;
    }
    this.cdr.detectChanges();
  }
}
