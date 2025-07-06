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
// import { ProjectsComponent } from './shared/pages/projects-page/projects.component';
import { AdministrationComponent } from './shared/pages/administration-page/administration.component';
import { PreprocessingComponent } from './shared/pages/preprocessing-page/preprocessing.component';
import { UsersComponent } from './shared/pages/users-page/users.component';
import { RolesComponent } from './shared/pages/roles-page/roles.component';
import { getToken } from './core/interceptor/token.interceptor';
import { AuthService } from './features/auth/auth.service';
import { UserinfoComponent } from './shared/pages/userinfo-page/userinfo.component';
import { NotificationsComponent } from './shared/pages/notifications-page/notifications.component';
import { DatasetDetailPageComponent } from './shared/pages/dataset-detail-page/dataset-detail-page.component';
import { EntitiesComponent } from './shared/pages/entities/entities.component';
import { isLoggedInGuard } from './features/auth/guards/is-logged-in.guard';
import { permissionGuard } from './features/auth/guards/permission.guard';

// const auntService =

const validate = (token: string | null = getToken()) => {
  let flag = false;

  // const authService = new AuthService();
  // AuthService.validateToken(token).subscribe({
  // esto tiene que validarse con un web token , de momento ya est la base

  // console.log(token);
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
    canMatch: [isLoggedInGuard],

    children: [
      { path: 'home', component: HomePageComponent },
      {
        path: 'projects',
        component: ProjectPageComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_project'] },
      },
      { path: 'projects/:id', component: ProjectDetailPageComponent, canActivate: [permissionGuard],
        data: { permissions: ['view_project'] },},
      { path: 'projects/:id/:dataset', component: DatasetDetailPageComponent ,
        canActivate: [permissionGuard],
        data: { permissions: ['view_project','view_dataset','view_data'] },},
      { path: 'preprocess', component: PreprocessingComponent },
      { path: 'management', component: AdministrationComponent },
      { path: 'user_information', component: UserinfoComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'users', component: UsersComponent ,
        canActivate: [permissionGuard],
        data: { permissions: ['view_user'] }, },
      { path: 'roles', component: RolesComponent ,
        canActivate: [permissionGuard],
        data: { permissions: ['view_role'] },},
      { path: 'entities', component: EntitiesComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_entity'] }, },
      { path: 'a', component: AnonymizationPageComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
