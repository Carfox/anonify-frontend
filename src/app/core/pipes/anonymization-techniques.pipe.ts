import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'AnonymizationTechniquesPipe',
  standalone: true,
})
export class AnonymizationTechniquesPipe implements PipeTransform {

  transform(value: unknown): string {
    if (value === 'generalization') {
      return 'Generalización';
    } else if (value === 'suppression') {
      return 'Supresión';
    } else if (value === 'masking') {
      return 'Enmascaramiento';
    }else {
      return 'No definido';
    }
  }
}
