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
import { Columns, Dataset } from 'app/core/interfaces/dataset.interface';
import { Entity } from 'app/core/interfaces/entity.interface';
import { WebSocketMessage } from 'app/core/interfaces/websocket.interface';
import { WebSocketService } from 'app/core/services/websocket.service';
import { environment } from 'environments/environment.development';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { count, filter, Subscription } from 'rxjs';
import { PreprocessService } from './preprocess.service';
import {
  DatasetPreprocess,
  PreprocessStep,
  PreprocessTechnique,
} from 'app/features/anonymization-wizard/components/preprocessing-step/preprocess.interface';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'aw-preprocessing-step',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule, Dialog, ToastModule ],
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
  //   this.onNeedSpecsChange(this.needSpecs);
  // }

  selectedEntity: Entity;
  needPreprocessing: boolean;
  needSpecs: boolean;
  cleanMode: number = 1;
  preprocessingStatus: string = 'Inactivo';
  preprocessingProgress: number = 0;
  outMessage: string = 'SALIDA:';
  showProgress: boolean = true;
  infoToSend: DatasetPreprocess;
  technique_selected: string;
  show_selection_dialog: boolean = false;
  selectedColumns: Columns[] = [];
  isSelectedAll: boolean = false;
  numberToUseOnDelete: number = 0;
  max_cols: number = 10;

  clean_methods: PreprocessTechnique[] = [
    // CHECK
    {
      name: 'Por defecto',
      value: 'default',
      description:
        'Dejar que el sistema defina la técnica de preprocesamiento para las columnas seleccionadas.',
    },
    // CHECK
    {
      name: 'Eliminar Datos con Valores Faltantes',
      value: 'delete',
      description:
        'Eliminar los datos que contengan un numero mayor de datos faltantes en base a un porcentaje (%) del numero de columnas total de dataset.',
    },

    // TODO (CHECK)
    {
      name: 'Eliminar Datos Duplicados',
      value: 'delete_duplicates',
      description: 'Eliminar los datos que estén duplicados en las columnas seleccionadas.',
    },
    // TODO (CHECK)
    {
      name: 'Eliminar Datos con Valores Atípicos',
      value: 'delete_outliers',
      description:
        'Eliminar los datos que contengan valores imposibles en las columnas seleccionadas.',
    },
    // TODO (CHECK)
    {
      name: 'Remplazar valores atípicos por Nan',
      value: 'outliers_to_nan',
      description:
        'Remplazar los valores atípicos que contengan valores imposibles en las columnas seleccionadas por valores nulos (null).',
    },
    // TODO (CHECK)
    {
      name: 'Remplazar valor atípico por limite inferior o superior',
      value: 'clip_to_bounds',
      description:
        'Remplazar los valores atípicos que contengan valores imposibles en las columnas seleccionadas por el valor limite inferior o superior según corresponda.',
    },
    // TODO (FUNCIONA)
    {
      name: 'Eliminar Columna',
      value: 'delete_columns',
      description:
        'Eliminar la columna completa seleccionada del dataset.',
    },
    // TODO (CHECK)
    {
      name: 'Convertir Datos vacíos a Nan',
      value: 'empty_to_nan',
      description:
        'Convertir los datos que estén vacíos a valores nulos (null).',
      
    },
    // TODO (CHECK)
    {
      name: 'Convertir Tipo de dato numérico de entero a flotante (INT -> FLOAT)',
      value: 'fix_int_to_float',
      description:
        'Convertir los valores de la columna seleccionada a tipo numérico (INT <- FLOAT).',
    },
    {
      name: 'Convertir Tipo de dato de Flotante a Entero (FLOAT -> INT)',
      value: 'fix_float_to_int',
      description:
        'Convertir los valores de la columna seleccionada a tipo numérico entero (FLOAT -> INT).',
    },


    // (CHECK)
    {
      name: 'Imputación por valor constante',
      value: 'const_value',
      description:
        'Para aquellos datos que estén vacíos se remplaza por un valor fijo definido.',
    },
    // (CHECK)
    {
      name: 'Imputación por Media Aritmética',
      value: 'media_impute',
      description:
        'Los valores faltantes se remplazan por la media de los datos del atributo. NOTA: Solo se puede usar en valores numéricos.',
    },
    // (CHECK)
    {
      name: 'Imputación por Mediana',
      value: 'median_impute',
      description:
        'Los valores faltantes se remplazan por la mediana de los datos del atributo. NOTA: Solo se puede usar en valores numéricos.',
    },
    // CHECK
    {
      name: 'Imputación por KNN',
      value: 'knn_impute',
      description:
        'Los valores faltantes se remplazan por los valores cercanos a valores vecinos.',
    },
    //CHECK
    {
      name: 'Imputación por Moda',
      value: 'most_frecuent',
      description:
        'Los valores faltantes se remplazan por el valor mas frecuente del atributo',
    },

    
  ];

  preprocessingSteps: PreprocessStep[] = [];

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
    // ... Descripción y cierre de WebSocket al destruir el componente
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
            this.outMessage += message.error
              ? `\n${message.error}`
              : '\nPreprocesamiento Finalizado.';
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
          this.outMessage +=
            'Fallo en la conexión o comunicación con el servidor.';
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
    // this.showProgress = true;
    
    if(this.needPreprocessing == undefined || this.needSpecs == undefined || this.selectedEntity == undefined){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe completar todos los campos del formulario',
        life: 3000,
      });
      return;
    }

    console.log('Iniciando preprocesamiento con:');
    console.log('Entidad seleccionada:', this.selectedEntity.name);
    console.log('Necesita preprocesamiento:', this.needPreprocessing);
    console.log('Pasos de preprocesamiento:', this.preprocessingSteps);
    // validar que todos los campos se han llenado 
    if (!this.selectedEntity) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, selecciona una entidad.',
        life: 3000,
      });
      return;
    }
    if (!this.needPreprocessing) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, selecciona si necesitas preprocesamiento.',
        life: 3000,
      });
      return;
    }
    if (this.preprocessingSteps.length === 0 && !this.needPreprocessing) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, añade al menos un paso de preprocesamiento.',
        life: 3000,
      });
    //TODO
      return;
    }

    console.log("antes de emitir")
    // Preparar la información a enviar al backend
    this.infoToSend = {
      projectID: this.projectID,
      datasetID: this.datasetID,
      entityID: "d4182527-cf43-4503-8c17-dc72cbaef2e8",
      parameters: {

        dataset_status: this.dataset.status,
        need_preprocess: this.needPreprocessing,
        // need_imputation: true,
        // cleaning_method: 'imputation',
        columns: this.dataset.files[0].columns,
        rows: this.dataset.files[0].rows,
        steps: this.preprocessingSteps,
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
        } else {
          this.preprocessingStatus = 'Error';

          console.error('El backend no devolvió un ID de operación.');
          this.outMessage +=
            'El backend no devolvió un ID de operación para el seguimiento.';
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
  showSelectionDialog() {
    this.max_cols = this.dataset.files[0].columns.length;
    console.log('Total de columnas', this.max_cols);
    this.show_selection_dialog = true;
  }
  savePreprocessStep() {
    // todo el codig y al final se cierra el dialog
    const dataToAdd: PreprocessStep = {
      columns: this.selectedColumns,
      value: this.technique_selected == 'delete' ? this.numberToUseOnDelete : 0,
      technique: this.technique_selected,
    };

    this.preprocessingSteps = this.preprocessingSteps.concat(dataToAdd);
    console.log(this.preprocessingSteps);
    this.selectedColumns = [];
    this.technique_selected = '';

    this.show_selection_dialog = false;
  }
  toggleColumnSelection(column: Columns, checked: boolean): void {
    if (checked) {
      if (!this.selectedColumns.includes(column)) {
        this.selectedColumns.push(column);
      }
    } else {
      if (this.isSelectedAll == true) {
        this.isSelectedAll = false;
        // this.cdr.detectChanges()
      }

      this.selectedColumns = this.selectedColumns.filter(
        (column) => column.id !== column.id
      );
    }
  }
  toggleAllColumns(checked: boolean) {
    if (checked) {
      this.selectedColumns = [];
      this.selectedColumns = this.selectedColumns.concat(
        this.dataset.files[0].columns
      );
      // this.cdr.detectChanges()
    } else {
      this.selectedColumns = [];
      // this.cdr.detectChanges()
    }
  }

  onNeedSpecsChange(newValue: boolean) {
    console.log('El valor de needSpecs cambió a:', newValue);

    if (newValue) {
      // Lógica si es "Sí"
      console.log('Se usará preprocesamiento por defecto');
      const columns = this.dataset.files.find(
        (file) => file.detail == 'uploaded'
      ).columns;
      const technique = 'default';
      this.preprocessingSteps = [
        {
          columns: columns,
          technique: technique,
          value: 0,
        },
      ];
    } else {
      // Lógica si es "No"
      console.log('Se deben especificar opciones avanzadas');
      this.preprocessingSteps = [];
    }
  }
  deleteStep(del_index: number) {
    this.preprocessingSteps = this.preprocessingSteps.filter(
      (step, index) => index !== del_index
    );
  }
  extractNames(columns: Columns[], separator: string = ' | '): string {
    return columns.map((col) => col.name).join(separator);
  }
}
