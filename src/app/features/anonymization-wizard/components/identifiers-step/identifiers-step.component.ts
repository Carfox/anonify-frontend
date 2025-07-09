import { ConfirmationService, MessageService } from 'primeng/api';
// import { Product } from '@domain/product';
// import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FileService } from 'app/core/services/file.service';
import { Attribute, HierarchyStrategy } from 'app/core/interfaces/anonymization.interface';
import { SelectModule } from 'primeng/select';
import { AnonymizationTechniquesPipe } from 'app/core/pipes/anonymization-techniques.pipe';
import { DatasetService } from 'app/features/datasets/dataset.service';
interface DatasetPreviewResponse {
  preview: any[];
  index: number;
  total_pages: number;
  total_rows: number;
}

@Component({
  selector: 'aw-identifiers-step',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    SelectModule,
    AnonymizationTechniquesPipe,
  ],

  providers: [MessageService, ConfirmationService],
  templateUrl: './identifiers-step.component.html',
  styles: `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifiersStepComponent implements OnInit, OnChanges {
  @Input({ required: true }) datasetID = '';

  public selectedPrivacyModel: 'K_ANONYMITY' | 'K_AND_L_DIVERSITY' =
    'K_ANONYMITY';
  public privacyK: number = 2;
  public privacyL: number = 1;

  public productDialog: boolean = false;

  public labels!: Attribute[];

  public label!: Attribute;

  public submitted: boolean = false;

  labelTypes = [
    {
      label: 'Identificador Directo',
      value: 'IDENTIFYING_ATTRIBUTE',
    },
    {
      label: 'Quasi-identificador',
      value: 'QUASI_IDENTIFYING_ATTRIBUTE',
    },
    { label: 'Dato Sensitivo ', value: 'SENSITIVE_ATTRIBUTE' },
    { label: 'Dato No Sensitivo ', value: 'INSENSITIVE_ATTRIBUTE' },
  ];

  anoynimizationTechniques = [
    { name: 'Generalización', value: 'generalization' },
    { name: 'Supresión', value: 'suppression' },
    { name: 'Enmascaramiento', value: 'masking' },
  ];

  hierarchyTypes = [
    { label: 'Por Intervalos (numérico)', value: 'class_intervals' },
    { label: 'Categórico', value: 'categorical' },
  ];

  maskingHierarchyTypes = [
    { label: 'Jerarquía Textual (automática)', value: 'textual' },
  ];

  privacyModels = ['k-anonymity', 'l-diversity'];

  constructor(
    private datasetService: DatasetService, // 👈 nuevo
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.datasetID) {
      console.error('datasetID no proporcionado');
      return;
    }

    // 🔁 Reemplaza el llamado anterior por este
    this.datasetService.getDatasetPreview(this.datasetID, 1, 5).subscribe({
      next: (res: DatasetPreviewResponse) => {
        const preview = res.preview;
        if (!preview || preview.length === 0) return;

        const headers = Object.keys(preview[0]).map((key) => key.trim());

        const attributes: Attribute[] = headers.map((header) => ({
          name: header,
          technique: undefined,
          privacyModel: undefined,
          attributeType: undefined,
          parameters: {},
          hierarchyStrategy: {
            type: undefined,
            numClasses: 0,
            amplitud: -1,
          },
        }));

        this.labels = attributes;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar headers desde preview:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener los encabezados del dataset.',
          life: 3000,
        });
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.label.attributeType === 'IDENTIFYING_ATTRIBUTE') {
      this.label.technique = 'suppression';
    }
  }

  editProduct(product: any) {
    this.label = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveLabel() {
    this.submitted = true;

    if (this.label.name?.trim()) {
      if (this.label.name) {
        this.setModelPrivacy(this.label.attributeType);
        this.labels[this.findIndexById(this.label.name)] = this.label;
        console.log(this.label);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Identificador Actualizado',
          life: 3000,
        });
      } else {
        this.labels.push(this.label);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Identificador Creado',
          life: 3000,
        });
      }

      this.labels = [...this.labels];
      this.productDialog = false;
      this.label = {};
    }
  }

  findIndexById(name: string): number {
    let index = -1;
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i].name === name) {
        index = i;
        break;
      }
    }

    return index;
  }

  submitAnonymization() {
    if (!this.labels || this.labels.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay atributos configurados.',
      });
      return;
    }

    const payload = {
      filePath: `uploads/${this.datasetID}.csv`, // O ajusta como corresponda
      attributes: this.labels.map((label) => {
        const attr: any = {
          name: label.name,
          attributeType: label.attributeType,
        };

        if (label.hierarchyStrategy?.type) {
          attr.hierarchyStrategy = {
            type: label.hierarchyStrategy.type,
            numClasses: label.hierarchyStrategy.numClasses,
            amplitud: label.hierarchyStrategy.amplitud,
          };
        }

        return attr;
      }),
      privacyModel: {
        type: this.selectedPrivacyModel,
        parameters:
          this.selectedPrivacyModel === 'K_ANONYMITY'
            ? { k: this.privacyK }
            : { k: this.privacyK, l: this.privacyL },
      },
    };

    console.log('Payload para enviar:', payload);

    // Aquí llamas al backend
    // this.datasetService.anonymizeDataset(payload).subscribe({
    //   next: (res) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Anonimización exitosa',
    //       detail: 'Los datos han sido anonimizados correctamente.',
    //     });
    //   },
    //   error: (err) => {
    //     console.error('Error al anonimizar:', err);
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'No se pudo anonimizar el dataset.',
    //     });
    //   },
    // });
  }

  setModelPrivacy(value: string) {
    if (value === 'QUASI_IDENTIFYING_ATTRIBUTE') {
      this.label.privacyModel = this.privacyModels[0];
      this.label.parameters = {
        k: 2,
      };
    } else if (value === 'SENSITIVE_ATTRIBUTE') {
      this.label.privacyModel = this.privacyModels[1];
      this.label.parameters = {
        l: 2,
      };
    } else if (
      value === 'IDENTIFYING_ATTRIBUTE' ||
      value === 'INSENSITIVE_ATTRIBUTE'
    ) {
      this.label.privacyModel = null;
    }
  }

  // getTechnique(technique: string) {
  //   switch (technique) {
  //     case 'suppression':
  //       return 'success';
  //     case 'generalization':
  //       return 'success';
  //     case 'masking':
  //       return 'success';
  //   }
  //   return 'success';
  // }
}
