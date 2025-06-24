import { AnonymizationWizardComponent } from './../../../features/anonymization-wizard/anonymization-wizard.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";

@Component({
  standalone: true,
  imports: [AnonymizationWizardComponent, MenuBarComponent],
  template: `<div class="p-[100px]">
  <app-anonymization-wizard></app-anonymization-wizard>
  </div>
      
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymizationPageComponent {}
