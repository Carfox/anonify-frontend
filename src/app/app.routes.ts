import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { DashboardPageComponent } from './shared/pages/dashboard-page/dashboard-page.component';
import { dataUploadRoutes } from './features/data-upload/data-upload.routes';
import { DataPreviewComponent } from './features/data-preview/data-preview.component';
import { DataIdentifierComponent } from './features/data-identifier/data-identifier.component';
import { DataAnoymizeComponent } from './features/data-anoymize/data-anoymize.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectPageComponent } from './shared/pages/project-page/project-page.component';
import { ProjectDetailPageComponent } from './shared/pages/project-detail-page/project-detail-page.component';
import { projectRoutes } from './features/projects/projects.routes';
import { AnonymizationPageComponent } from './shared/pages/anonymization-page/anonymization-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  // { path: 'auth', component: LoginComponent, pathMatch: 'full' },
  // {
  //   path: 'projects',
  //   component: ProjectPageComponent,
  // },
  // {
  //   path: 'projects/:id',
  //   component: ProjectDetailPageComponent,
  //   children: projectRoutes,
  // },
  {
    path: 'a',
    component: AnonymizationPageComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
