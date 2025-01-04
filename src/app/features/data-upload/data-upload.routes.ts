import { Routes } from '@angular/router';
import { DataUploadLayoutComponent } from './data-upload-layout';
import { ByFileComponent } from './components/by-file/by-file.component';
import { ByDbComponent } from './components/by-db/by-db.component';


export const dataUploadRoutes: Routes = [
  {
    path: '',
    component: DataUploadLayoutComponent,
    children: [
      { path: 'by-file', component: ByFileComponent },
      { path: 'by-db', component: ByDbComponent },
      { path: '', redirectTo: 'by-file', pathMatch: 'full' },
    ],
  },
];
