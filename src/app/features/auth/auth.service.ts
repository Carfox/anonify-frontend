import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getToken, removeToken } from 'app/core/interceptor/token.interceptor';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
interface JwtPayload {
  id: string; // Corresponds to user_info.id
  name: string; // Corresponds to user_info.name
  username: string; // Corresponds to user_info.username
  // mail: string; // Corresponds to user_info.mail
  role: {
    id: string; // UUID of the role
    name: string;
    permissions: Array<{ name: string; description: string }>; // Array of permission objects
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.loadUserPermissionsFromToken(); 
  }
  // Use BehaviorSubject to hold and emit the current user's permissions
  private userPermissionsSubject = new BehaviorSubject<string[]>([]);
  public userPermissions$ = this.userPermissionsSubject.asObservable();
  private router = inject(Router);

  private apiUrl = environment.apiUrl;
  private login = '/api/login';
  postLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${this.login}`, { username, password })
      .pipe(
        tap((res: any) => {
          const token = res.token; // Get the token from the response
          if (token) {
            localStorage.setItem('token', token); // Store the token
            this.loadUserPermissionsFromToken();

            // Load permissions after successful login
          } else {
            console.error('Login response did not contain a token.');
            this.logout(); // Clear any existing state if no token
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          this.logout(); // Ensure state is cleared on login failure
          return of(null); // Return an observable with null to complete the stream
        })
      );
  }

  validateToken() {
    const token = getToken();
    return this.http.get(`${this.apiUrl}/api/validate_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  logout() {
    const token = getToken();
    if (!token) {
      return;
    }
    this.userPermissionsSubject.next([]);
    removeToken();
    return;

    // return this.http.post(`${this.apiUrl}/api/logout`, {});
  }
  private loadUserPermissionsFromToken(): void {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        // Extract just the names of the permissions
        const permissionsNames =
          decodedToken.role?.permissions.map((p) => p.name) || [];
        this.userPermissionsSubject.next(permissionsNames);
      } catch (error) {
        console.error('Error decoding JWT for permissions:', error);
        this.userPermissionsSubject.next([]); // Clear permissions if decoding fails
        this.logout(); // Invalid token, force logout
      }
    } else {
      this.userPermissionsSubject.next([]); // No token, no permissions
    }
  }

  // --- Permission Checkers ---
  hasPermission(permissionName: string): boolean {
    const currentPermissions = this.userPermissionsSubject.getValue(); // Get the current array of permissions
    return currentPermissions.includes(permissionName);
  }

  hasAnyPermission(permissionNames: string[]): boolean {
    const currentPermissions = this.userPermissionsSubject.getValue();
    return permissionNames.some((perm) => currentPermissions.includes(perm));
  }

  hasAllPermissions(permissionNames: string[]): boolean {
    const currentPermissions = this.userPermissionsSubject.getValue();
    return permissionNames.every((perm) => currentPermissions.includes(perm));
  }
}
