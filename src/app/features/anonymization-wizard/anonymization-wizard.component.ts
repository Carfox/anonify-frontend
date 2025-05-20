import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { UploadStepComponent } from "./components/upload-step.component";
import { PreviewStepComponent } from "./components/preview-step.component";
import { IdentifiersStepComponent } from "./components/identifiers-step/identifiers-step.component";
import { AnonymizeStepComponent } from "./components/anonymize-step.component";
import { ResultStepComponent } from "./components/result-step.component";
import { AnonymizeService } from 'app/core/services/anonymize.service';

@Component({
  selector: 'app-anonymization-wizard',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    UploadStepComponent,
    PreviewStepComponent,
    IdentifiersStepComponent,
    AnonymizeStepComponent,
    ResultStepComponent,
    RouterLink,
  ],
  template: `
    <p-stepper [value]="1" class="basis-[50rem]" [linear]="true">
      <p-step-list>
        <p-step [value]="1">Carga de Datos</p-step>
        <p-step [value]="2">Previsualización de Datos</p-step>
        <p-step [value]="3">Indentificadores de Datos</p-step>
        <p-step [value]="4">Anonimización</p-step>
        <p-step [value]="5">Resultados</p-step>
      </p-step-list>

      <p-step-panels>
        <p-step-panel [value]="1">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col justify-between min-h-[60vh] w-full">
              <div
                class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border"
              >
                <div
                  class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4"
                >
                  Carga de Datos
                </div>
                <div
                  class="font-medium text-surface-500 dark:text-surface-300 mb-4"
                >
                  Puedes cargar un archivo CSV o Excel para iniciar el proceso
                  de Anonimización. Asegúrate de que el archivo esté en el
                  formato correcto y contenga los datos necesarios.
                </div>
                <div class="border-2 border-dashed border-surface min-h-[45vh]">
                  <aw-upload-step></aw-upload-step>
                </div>
              </div>
              <div class="flex pt-5 justify-center">
                <p-button
                  label="Siguiente"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  (onClick)="activateCallback(2)"
                />
              </div>
            </div>
          </ng-template>
        </p-step-panel>

        <p-step-panel [value]="2">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col justify-between min-h-[60vh] w-full">
              <div
                class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border"
              >
                <div
                  class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4"
                >
                  Previsualización de Datos
                </div>
                <div
                  class="font-medium text-surface-500 dark:text-surface-300 mb-4"
                >
                  Puedes previsualizar los datos cargados en el paso anterior.
                  Asegúrate de que los datos sean correctos y estén en el
                  formato adecuado antes de continuar.
                </div>
                <div class="border-2 border-dashed border-surface min-h-[45vh]">
                  <aw-preview-step></aw-preview-step>
                </div>
              </div>
              <div class="flex pt-5 justify-center">
                <p-button
                  class="mr-5"
                  label="Anterior"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  (onClick)="activateCallback(1)"
                />
                <p-button
                  class="ml-5"
                  label="Siguiente"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  (onClick)="activateCallback(3)"
                />
              </div>
            </div>
          </ng-template>
        </p-step-panel>

        <p-step-panel [value]="3">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col justify-between min-h-[60vh] w-full">
              <div
                class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border"
              >
                <div
                  class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4"
                >
                  Identificadores de Datos
                </div>
                <div
                  class="font-medium text-surface-500 dark:text-surface-300 mb-4"
                >
                  Puedes seleccionar los identificadores de datos que deseas
                  anonimizar. Asegúrate de que los identificadores seleccionados
                  sean correctos y estén en el formato adecuado antes de
                  continuar.
                </div>
                <div class="border-2 border-dashed border-surface min-h-[45vh]">
                  <aw-identifiers-step></aw-identifiers-step>
                </div>
              </div>
              <div class="flex pt-5 justify-center">
                <p-button
                  class="mr-5"
                  label="Anterior"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  (onClick)="activateCallback(2)"
                />
                <p-button
                  class="ml-5"
                  label="Anonimizar"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  (onClick)="activateCallback(4)"
                  (onClick)="applyAnonymization()"
                />
              </div>
            </div>
          </ng-template>
        </p-step-panel>
        <p-step-panel [value]="4">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col justify-between min-h-[60vh] w-full">
              <div
                class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border"
              >
                <div
                  class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4"
                >
                  Datos Anonimizados
                </div>
                <div
                  class="font-medium text-surface-500 dark:text-surface-300 mb-4"
                >
                  Se ha realizado la anonimización de los datos seleccionados. A
                  continuación, puedes ver los datos anonimizados. Asegúrate de
                  que los datos sean correctos y estén en el formato adecuado
                  antes de continuar.
                </div>
                <div class="border-2 border-dashed border-surface min-h-[45vh]">
                  <aw-anonymize-step
                    [data]="anonymizedData"
                  ></aw-anonymize-step>
                </div>
              </div>
              <div class="flex pt-5 justify-center">
                <p-button
                  class="mr-5"
                  label="Anterior"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  (onClick)="activateCallback(3)"
                />
                <p-button
                  class="ml-5"
                  label="Siguiente"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  (onClick)="activateCallback(5)"
                  (onClick)="applyAnonymization()"
                />
              </div>
            </div>
          </ng-template>
        </p-step-panel>
        <p-step-panel [value]="5">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col justify-between min-h-[60vh] w-full">
              <div
                class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border"
              >
                <div
                  class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4"
                >
                  Resultados de la Anonimización
                </div>
                <div
                  class="font-medium text-surface-500 dark:text-surface-300 mb-4"
                >
                  Puedes descargar los resultados de la anonimización. Asegúrate
                  de que los resultados sean correctos y estén en el formato
                  adecuado antes de continuar.
                </div>
                <div class="border-2 border-dashed border-surface min-h-[45vh]">
                  <aw-result-step></aw-result-step>
                </div>
              </div>
              <div class="flex pt-5 justify-center">
                <p-button
                  label="Salir"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  routerLink="/home"
                />
              </div>
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-panels>
    </p-stepper>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymizationWizardComponent {
  private anonymizeService = inject(AnonymizeService);
  public anonymizedData!: any[];
  @ViewChild(IdentifiersStepComponent)
  identifiersStepComponent!: IdentifiersStepComponent;

  applyAnonymization() {
    const data = this.identifiersStepComponent.labels;
    this.anonymizeService
      .applyAnonymization(localStorage.getItem('sessionID'), data)
      .subscribe(
        (response: any) => {
          console.log('Anonymization response:', response);
          this.anonymizedData = response.data;
        },
        (error) => {
          console.error('Error during anonymization:', error);
        }
      );
  }
}
