import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileDataSharedService {
  constructor() {}
  private fileSessionID = new BehaviorSubject<any>(undefined); // Valor inicial vacío
  currentFileSessionID$ = this.fileSessionID.asObservable(); // Observable público para suscribirse

  // Método para actualizar los datos
  updateSession(newData: any) {
    console.log('ID de la session: ', newData);
    this.fileSessionID.next(newData);
  }

  // Método para obtener el valor actual
  getCurrentSessionID() {
    return this.fileSessionID.getValue();
  }
}
