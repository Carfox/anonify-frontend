import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { DashboardPageComponent } from './shared/pages/dashboard-page/dashboard-page.component';
import { dataUploadRoutes } from './features/data-upload/data-upload.routes';
import { DataPreviewComponent } from './features/data-preview/data-preview.component';
import { DataIdentifierComponent } from './features/data-identifier/data-identifier.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
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
        component: DataIdentifierComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'projects',
      //   loadChildren: () => import('./features/projects/projects.module').then((m) => m.ProjectsModule),
      // },

      { path: 'anonimizar', component: HomePageComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo:'home', pathMatch: 'full' },
];
