import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken, removeToken } from 'app/core/interceptor/token.interceptor';
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
    const token = getToken();
    if (!token) {
      return;
    }
    removeToken();
    return;

    // return this.http.post(`${this.apiUrl}/api/logout`, {});
  }

}
