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
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ProjectsComponent } from './shared/pages/projects-page/projects.component';
import { AdministrationComponent } from './shared/pages/administration-page/administration.component';
import { PreprocessingComponent } from './shared/pages/preprocessing-page/preprocessing.component';
import { UsersComponent } from './shared/pages/users-page/users.component';
import { RolesComponent } from './shared/pages/roles-page/roles.component';

const validate = (token: string | null) => {
  let flag = false;

  // esto tiene que validarse con un web token , de momento ya est la base

  console.log(token);
  if (flag) {
    return 'login';
  } else {
    return 'home';
  }
};



export const routes: Routes = [
  
{ path: 'login', component: LoginComponent },
  {
    path: 'anonify',
    component: LayoutComponent,

    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:id', component: ProjectDetailPageComponent },
      { path: 'preprocess', component: PreprocessingComponent },
      { path: 'management', component:  AdministrationComponent},
      { path: 'users', component:  UsersComponent},
      { path: 'roles', component:  RolesComponent},
      { path: 'a',component: AnonymizationPageComponent},
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
