import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiviteDetailsPage } from './activite-details.page';

const routes: Routes = [
  {
    path: ':id',
    component: ActiviteDetailsPage
  },
  {
    path: '',
    loadChildren: () => import('./abscence/abscence.module').then( m => m.AbscencePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./modification-page/modification-page.module').then( m => m.ModificationPagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiviteDetailsPageRoutingModule {}
