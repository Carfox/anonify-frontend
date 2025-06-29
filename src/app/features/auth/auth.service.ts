import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;
  private login = "/api/login";
  postLogin(username: string, password: string) {
    return this.http.post(`${this.apiUrl}${this.login}`, {username, password});
  }

  validateToken(token: string) {
    return this.http.post(`${this.apiUrl}/api/validate_token`, {
      headers: {

        Authorization: `Bearer ${token}`
      },
     });
  }
  logout() {
    return this.http.post(`${this.apiUrl}/api/logout`, {});
  }

}
