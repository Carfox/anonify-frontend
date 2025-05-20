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
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FileService } from 'app/core/services/file.service';
import { Attribute, HierarchyStrategy } from 'app/core/interfaces/anonymization.interface';
import { SelectModule } from 'primeng/select';
import { AnonymizationTechniquesPipe } from 'app/core/pipes/anonymization-techniques.pipe';

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

  private sessionID: string | null = localStorage.getItem('sessionID');
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
    private fileService: FileService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.label.attributeType === 'IDENTIFYING_ATTRIBUTE') {
      this.label.technique = 'suppression';
    }
  }

  ngOnInit() {
    if (!this.sessionID) {
      alert('Error loading data');
      return;
    }

    this.fileService.loadHeadersFromFileData(this.sessionID).subscribe({
      next: (res) => {
        const attributes: Attribute[] = res.data.map((label) => ({
          name: label,
          technique: undefined, // default
          privacyModel: undefined, // default
          attributeType: undefined, // default
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
        console.error('Error al cargar cabeceras:', err);
      },
    });
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
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.labels.push(this.label);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
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
