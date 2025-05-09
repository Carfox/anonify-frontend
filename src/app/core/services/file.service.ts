import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = environment.apiCarfox;
  private uploadCSV = environment.routes.anoninaus.uploadCSV.url;
  private headersCSV = environment.routes.anoninaus.headersCSV.url;

  constructor(private http: HttpClient) {}

  postUploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.apiUrl}${this.uploadCSV}`, formData);
  }

  getheadersFromFile() {
    return this.http.get<any>(`${this.apiUrl}${this.headersCSV}`);
  }
}
