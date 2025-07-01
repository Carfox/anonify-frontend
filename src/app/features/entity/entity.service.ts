import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken } from 'app/core/interceptor/token.interceptor';
import { CreateEntity } from 'app/core/interfaces/entity.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiUrl;

  getAllEntities() {
    const token = getToken();

    return this.http.get(`${this.apiURL}/api/administration/entity`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createEntity(entity: CreateEntity) {
    const token = getToken();
    return this.http.post(`${this.apiURL}/api/administration/entity`, entity, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteEntity(entityID: string) {
    const token = getToken();
    return this.http.delete(`${this.apiURL}/api/administration/entity/${entityID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
