import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectPageComponent } from './shared/pages/project-page/project-page.component';
import { ProjectDetailPageComponent } from './shared/pages/project-detail-page/project-detail-page.component';
import { AnonymizationPageComponent } from './shared/pages/anonymization-page/anonymization-page.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AdministrationComponent } from './shared/pages/administration-page/administration.component';
import { PreprocessingComponent } from './shared/pages/preprocessing-page/preprocessing.component';
import { UsersComponent } from './shared/pages/users-page/users.component';
import { RolesComponent } from './shared/pages/roles-page/roles.component';
import { getToken } from './core/interceptor/token.interceptor';
import { UserinfoComponent } from './shared/pages/userinfo-page/userinfo.component';
import { NotificationsComponent } from './shared/pages/notifications-page/notifications.component';
import { DatasetDetailPageComponent } from './shared/pages/dataset-detail-page/dataset-detail-page.component';
import { EntitiesComponent } from './shared/pages/entities/entities.component';
import { isLoggedInGuard } from './features/auth/guards/is-logged-in.guard';
import { permissionGuard } from './features/auth/guards/permission.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

const validate = (token: string | null = getToken()) => {
  let flag = false;
  if (flag) {
    return 'login';
  } else {
    return 'home';
  }
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
  path: 'acceso-denegado',
  component: AccessDeniedComponent,
}
,
  {
    path: 'a',
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
      {
        path: 'projects/:id',
        component: ProjectDetailPageComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_project'] },
      },
      {
        path: 'projects/:id/:dataset',
        component: DatasetDetailPageComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_project', 'view_dataset', 'view_data'] },
      },
      { path: 'preprocess', component: PreprocessingComponent },
      { path: 'management', component: AdministrationComponent },
      { path: 'user_information', component: UserinfoComponent },
      { path: 'notifications', component: NotificationsComponent },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_user'] },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_role'] },
      },
      {
        path: 'entities',
        component: EntitiesComponent,
        canActivate: [permissionGuard],
        data: { permissions: ['view_entity'] },
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
