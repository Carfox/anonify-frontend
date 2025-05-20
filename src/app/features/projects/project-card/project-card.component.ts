import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'app/core/interfaces/project.interface';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [CommonModule, CardModule, Button],
  template: `
    <p-card [style]="{ width: '20rem', overflow: 'hidden' }">
      <ng-template #title>
        <h3>{{ item.title }}</h3>
      </ng-template>

        <p>{{ item.description }}</p>


      <ng-template #footer>
        <div class="flex gap-6 mt-1">
          <p-button
            label="Cargar Proyecto"
            class="w-full"
            styleClass="w-full"
            (click)="onMoreInfo()"
          />
        </div>
      </ng-template>
    </p-card>
  `,
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input({required: true}) item: Project;
  private router = inject(Router);


  onMoreInfo() {
    this.router.navigate(['/projects', this.item.id]);
    console.log('Más información sobre el elemento:', this.item);
  }
}
