import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { getToken } from 'app/core/interceptor/token.interceptor';
import { CreateUser } from 'app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiUrl;

  getAllUsers() {
    const token = getToken();
    return this.http.get(`${this.apiURL}/api/administration/authors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  createUser(UserInfo: CreateUser){

    const token = getToken();
    return this.http.post(`${this.apiURL}`,UserInfo
    ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
  }
}
