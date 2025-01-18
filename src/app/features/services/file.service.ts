import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = environment.apiUrl;
  private uploadCSV = environment.routes.uploadCSV.url;
  private headersCSV = environment.routes.headersCSV.url;

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
