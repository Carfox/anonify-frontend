import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entity } from 'app/core/interfaces/entity.interface';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'aw-preprocessing-step',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule],
  providers:[MessageService],
  templateUrl: './preprocessing-step.component.html',
  styleUrl: './preprocessing-step.component.css'
})
export class PreprocessingStepComponent{

  @Input({required: true}) datasetID = '';
  @Input({required: true}) projectID = '';
  @Input({required: true}) entities = [];

  @Output() preprocessingData = new EventEmitter<void>();

  // ngOnInit(): void {

  //   // console.log("Info dentro de preprocesing step", this.projectID,this.datasetID, this.entities)
    
  // }

  selectedEntity: Entity
  needPreprocessing: boolean = true
  cleanMode: number = 1

  onSubmitPreprocessing(event: Event){

    event.preventDefault();

    console.log("Info a enviar:", this.datasetID, this.projectID, this.entities)
    console.log("Entidad seleccionada", this.selectedEntity)



  }
  showAdvancedOptions(event: Event){

    event.preventDefault()
    console.log("Mostrando opciones avanzadas")

    // const id = event.currentTarget.id.split("-").pop();

    // console.log("id", id);

    const content = document.getElementById(`accordion-open-body-1`);

    console.log("content", content);

    if (!content) return;


    // despues de cerrados los demas acordiones abrir el que se clickeo

    // Toggle the content's max-height for smooth opening and closing
    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = "0";
      // icon.innerHTML = plusSVG;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      // icon.innerHTML = minusSVG;
    }

  }

}
