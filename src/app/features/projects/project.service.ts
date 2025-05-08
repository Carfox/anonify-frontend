import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'app/core/interfaces/project.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiUrl;
  private projectsURL = undefined;
  private newProject = undefined

  get allprojects() {
    return this.http.get(`${this.apiURL}${this.projectsURL}`);
  }

  postNewProject(title: string, description: string, userID: string) {

    return this.http.post(`${this.apiURL}${this.newProject}`, {
      title,
      description,
      author_id: userID,
    });
  }
}
