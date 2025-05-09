import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { UploadStepComponent } from "./components/upload-step.component";
import { PreviewStepComponent } from "./components/preview-step.component";
import { IdentifiersStepComponent } from "./components/identifiers-step.component";
import { AnonymizeStepComponent } from "./components/anonymize-step.component";
import { ResultStepComponent } from "./components/result-step.component";

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
                  <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
                    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">
                      Carga de Datos
                    </div>
                    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">
                      Puedes cargar un archivo CSV o Excel para iniciar el proceso de
                      Anonimización. Asegúrate de que el archivo esté en el formato
                      correcto y contenga los datos necesarios.
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
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <aw-preview-step></aw-preview-step>
              </div>
            </div>
            <div class="flex pt-12 justify-between">
              <p-button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                (onClick)="activateCallback(1)"
              />
              <p-button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                (onClick)="activateCallback(3)"
              />
            </div>
          </ng-template>
        </p-step-panel>

        <p-step-panel [value]="3">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <aw-identifiers-step></aw-identifiers-step>
              </div>
            </div>
            <div class="flex pt-12 justify-between">
              <p-button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                (onClick)="activateCallback(2)"
              />
              <p-button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                (onClick)="activateCallback(4)"
              />
            </div>
          </ng-template>
        </p-step-panel>
        <p-step-panel [value]="4">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <aw-anonymize-step></aw-anonymize-step>>
              </div>
            </div>
            <div class="flex pt-12 justify-between">
              <p-button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                (onClick)="activateCallback(3)"
              />
              <p-button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                (onClick)="activateCallback(5)"
              />
            </div>
          </ng-template>
        </p-step-panel>
        <p-step-panel [value]="5">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <aw-result-step></aw-result-step>
              </div>
            </div>

            <div class="flex pt-12 justify-between">
              <p-button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                (onClick)="activateCallback(4)"
              />
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-panels>
    </p-stepper>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymizationWizardComponent {}
