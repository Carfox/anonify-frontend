import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
/**
 * @deprecated This service contains methods that are deprecated and may be removed in future versions.
 * Please consider using updated alternatives or consult the development team for guidance.
 */
export class FileService {
  private http = inject(HttpClient);

  private fileData: any = [];

  private apiUrl = environment.apiCarfox;
  private uploadCSV = environment.routes.anoninaus.uploadCSV.url;
  private originalFileData = environment.routes.anoninaus.originalFileData.url;
  private headersCSV = environment.routes.anoninaus.headersCSV.url;


  loadOriginalFileData(sessionID: string) {
    console.log('sessionID desde el servicio', sessionID);
    this.http
      .get(`${this.apiUrl}/${this.originalFileData}/${sessionID}`)
      .subscribe((res: any) => {
        console.log('Respuesta del servicio', res);
        this.fileData = res.data;
        console.log('fileData desde el servicio', this.fileData);
      });

    return this.fileData
  }

dataLoaded() {
  return this.fileData
}

  /**
   * @deprecated This method is deprecated and may be removed in future versions.
   * Please use an updated method for retrieving processed file data.
   */
  getProcessedFileData(sessionID: string) {
    return this.http.get(`${this.apiUrl}/processed-data/${sessionID}`);
  }
  /**
   * @deprecated This method is deprecated and may be removed in future versions.
   * Please use an updated method for retrieving processed file data.
   */
  postUploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.apiUrl}${this.uploadCSV}`, formData);
  }
  /**
   * @deprecated This method is deprecated and may be removed in future versions.
   * Please use an updated method for retrieving processed file data.
   */

  postFileSessionID(sessionID: string) {
    return this.http.post(`${this.apiUrl}${this.uploadCSV}`, { sessionID });
  }

  /**
   * @deprecated This method is deprecated and may be removed in future versions.
   * Please use an updated method for retrieving processed file data.
   */

  getheadersFromFile() {
    return this.http.get<any>(`${this.apiUrl}${this.headersCSV}`);
  }
}
