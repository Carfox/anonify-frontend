import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getToken } from 'app/core/interceptor/token.interceptor';
import { Project, ShareProject } from 'app/core/interfaces/project.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiUrl;
  private projectsURL = '/api/user/projects';
  private newProject = undefined;
  private userProjectsURL = '/api/user/projects';
  get allprojects() {
    const token = getToken();
    return this.http.get(`${this.apiURL}${this.projectsURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // funciona
  getUserProjects() {
    const token = getToken();

    return this.http.get(`${this.apiURL}${this.userProjectsURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // funciona
  postNewProject(title: string, description: string) {
    const token = getToken();

    return this.http.post(
      `${this.apiURL}${this.userProjectsURL}`,
      {
        title,
        description,

        // author_id: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getProjectById(id: string) {
    const token = getToken();
    return this.http.get<Project>(`${this.apiURL}/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteProjectById(id: string) {
    const token = getToken();
    return this.http.delete<Project>(`${this.apiURL}/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  shareProject(shareInfo: ShareProject) {
    const token = getToken();
    return this.http.post(`${this.apiURL}/api/user/projects/share`, shareInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
