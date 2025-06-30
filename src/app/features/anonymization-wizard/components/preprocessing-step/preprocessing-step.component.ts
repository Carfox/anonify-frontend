import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'aw-preprocessing-step',
  standalone: true,
  imports: [],
  providers:[MessageService],
  templateUrl: './preprocessing-step.component.html',
  styleUrl: './preprocessing-step.component.css'
})
export class PreprocessingStepComponent {

  @Input({required: true}) datasetID = '';
  @Input({required: true}) projectID = '';

  @Output() preprocessingData = new EventEmitter<void>();

}
