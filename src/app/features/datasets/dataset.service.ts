import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { getToken } from 'app/core/interceptor/token.interceptor';

import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiUrl;

  getDataset(datasetID: string) {
    const token = getToken();

    return this.http.get(`${this.apiURL}/api/datasets/${datasetID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


  }
  getDatasetPreview(datasetID: string, page_index: number, rows: number){



    const token = getToken();

    return this.http.get(`${this.apiURL}/api/datasets/${datasetID}/preview?page_index=${page_index}&&rows=${rows}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })


  }
  updateDatasetStatus(id: string, status: string){

    const token = getToken();
    return this.http.put(`${this.apiURL}/api/datasets`,{

      
      id,status


    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
  }

  deleteDataset(datasetID: string) {
    const token = getToken();

    return this.http.delete(`${this.apiURL}/api/datasets/${datasetID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


  }


}
