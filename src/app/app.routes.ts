import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { DashboardPageComponent } from './shared/pages/dashboard-page/dashboard-page.component';
import { dataUploadRoutes } from './features/data-upload/data-upload.routes';

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
      { path: 'anonimizar', component: HomePageComponent, pathMatch: 'full' },
      { path: 'review', component: HomePageComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: HomePageComponent, pathMatch: 'full' },
];
