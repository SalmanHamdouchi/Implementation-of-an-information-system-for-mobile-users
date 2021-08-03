import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProfPage } from './home-prof.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProfPage
  },
  {
    path: 'activite-details',
    loadChildren: () => import('./activite-details/activite-details.module').then( m => m.ActiviteDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProfPageRoutingModule {}
