import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-by-db',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  template: `
    <h3>Cargar desde Base de Datos</h3>
    <div class="p-fluid">
      <div class="field">
        <label for="connection">URL de Conexión</label>
        <input id="connection" pInputText [(ngModel)]="connectionString" />
      </div>
      <button pButton label="Conectar" (click)="connect()"></button>
    </div>
  `,
  styleUrl: './by-db.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByDbComponent {
  public connectionString: string = '';

  connect() {
    console.log('Conectando a:', this.connectionString);
  }
}
