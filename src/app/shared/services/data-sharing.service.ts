import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private tableSource = new BehaviorSubject<any>(undefined); // Valor inicial vacío
  currentTableData$ = this.tableSource.asObservable(); // Observable público para suscribirse

  // Método para actualizar los datos
  updateTable(newData: any) {
    console.log('DataSharingService: ', newData);
    this.tableSource.next(newData);
  }
}
