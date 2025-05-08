import { AnonymizationWizardComponent } from './../../../features/anonymization-wizard/anonymization-wizard.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header/header.component";

@Component({
  standalone: true,
  imports: [AnonymizationWizardComponent, HeaderComponent],
  template: `
    <shared-header></shared-header>
      <app-anonymization-wizard></app-anonymization-wizard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymizationPageComponent {}
