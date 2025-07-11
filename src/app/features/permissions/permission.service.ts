import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken } from 'app/core/interceptor/token.interceptor';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiUrl;

  getAllPermissions() {
    const token = getToken();
    return this.http.get(`${this.apiURL}/api/administration/permissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
