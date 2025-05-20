import { AnonymizationWizardComponent } from './../../../features/anonymization-wizard/anonymization-wizard.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";

@Component({
  standalone: true,
  imports: [AnonymizationWizardComponent, MenuBarComponent],
  template: `
      <shared-menu-bar></shared-menu-bar>
      <app-anonymization-wizard></app-anonymization-wizard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymizationPageComponent {}
