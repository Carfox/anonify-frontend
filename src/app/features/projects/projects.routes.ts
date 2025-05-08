import { Routes } from '@angular/router';
import { DatasetDetailPageComponent } from 'app/shared/pages/dataset-detail-page/dataset-detail-page.component';
import { DatasetPageComponent } from 'app/shared/pages/dataset-page/dataset-page.component';

export const projectRoutes: Routes = [

  {
    path: 'dataset/:id',
    component: DatasetDetailPageComponent,
    pathMatch: 'full',
  },
];
