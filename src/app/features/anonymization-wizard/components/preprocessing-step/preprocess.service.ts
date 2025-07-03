import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import DatasetPreprocess from './preprocess.interface';
import { getToken } from 'app/core/interceptor/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class PreprocessService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  preprocessData(parameters: DatasetPreprocess) {
    const token = getToken();

    return this.http.post(
      `${this.apiUrl}/api/datasets/preprocess`,
      parameters,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
