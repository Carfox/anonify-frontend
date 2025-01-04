import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private tableSource = new BehaviorSubject<any>(Object); // Valor inicial vacío
  currentTableData$ = this.tableSource.asObservable(); // Observable público para suscribirse

  // Método para actualizar los datos
  updateTable(newData: Object) {
    this.tableSource.next(newData[0]);
  }
}
