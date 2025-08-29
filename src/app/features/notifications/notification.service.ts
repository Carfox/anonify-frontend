import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getToken } from "app/core/interceptor/token.interceptor";
import { environment } from "environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiUrl;
  private notificationsURL = "/api/user/notifications";

  getUserNotifications() {
    const token = getToken();

    return this.http.get(`${this.apiURL}${this.notificationsURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
}