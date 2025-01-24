import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { DashboardPageComponent } from './shared/pages/dashboard-page/dashboard-page.component';
import { dataUploadRoutes } from './features/data-upload/data-upload.routes';
import { DataPreviewComponent } from './features/data-preview/data-preview.component';
import { DataIdentifierComponent } from './features/data-identifier/data-identifier.component';
import { DataAnoymizeComponent } from './features/data-anoymize/data-anoymize.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectPageComponent } from './shared/pages/project-page/project-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  { path: 'auth', component: LoginComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectPageComponent, pathMatch: 'full' },
  {
    path: 'a',
    component: DashboardPageComponent,
    children: [
      {
        path: 'upload',
        children: dataUploadRoutes,
      },
      {
        path: 'preview',
        component: DataPreviewComponent,
        pathMatch: 'full',
      },
      {
        path: 'identifier',
        component: DataIdentifierComponent,
        pathMatch: 'full',
      },
      {
        path: 'anonymize',
        component: DataAnoymizeComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'projects',
      //   loadChildren: () => import('./features/projects/projects.module').then((m) => m.ProjectsModule),
      // },

      { path: 'review', component: DataAnoymizeComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
