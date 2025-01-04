import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  { path: 'upload', component: HomePageComponent, pathMatch: 'full' },
  { path: 'anonimizar', component: HomePageComponent, pathMatch: 'full' },
  { path: 'review', component: HomePageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
