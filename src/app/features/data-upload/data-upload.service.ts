import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { getToken } from 'app/core/interceptor/token.interceptor';
@Injectable({
  providedIn: 'root',
})



export class DataUploadService {

    constructor(private http: HttpClient) {}

    // private http = inject(HttpClient);
    apiUrl = environment.apiUrl;


    uploadData(file: File, projectId: string) {
        const formData = new FormData();
        formData.append('file', file);

        // return this.http.post(`${this.apiUrl}/api/testv1/dataset/uploadfile/${projectId}`, formData, { headers: {
        //      Authorization: `Bearer ${getToken()}`,
        //     }, reportProgress: true, observe: 'events' })
        return this.http.post(`${this.apiUrl}/api/testv1/dataset/uploadfile/${projectId}`, formData, { headers: {
             Authorization: `Bearer ${getToken()}`,
            }})
      
    }

    

}

