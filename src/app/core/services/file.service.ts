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
  private fileHeadersData: string[] = [];

  private apiUrl = environment.apiCarfox;
  private uploadCSV = environment.routes.anonimaus.uploadCSV.url;
  private headersCSV = environment.routes.anonimaus.headersCSV.url;

  private originalFileData = environment.routes.anonimaus.originalFileData.url;
  private originalHeadersFileData =
    environment.routes.anonimaus.originalHeadersFileData.url;
  loadOriginalFileData(sessionID: string) {
    return this.http.get(`${this.apiUrl}/${this.originalFileData}/${sessionID}`)

  }

  loadHeadersFromFileData(sessionID: string) {
    return this.http.get<{ data: string[] }>(
      `${this.apiUrl}/${this.originalHeadersFileData}/${sessionID}`
    );
  }

  dataLoaded() {
    return this.fileData;
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
