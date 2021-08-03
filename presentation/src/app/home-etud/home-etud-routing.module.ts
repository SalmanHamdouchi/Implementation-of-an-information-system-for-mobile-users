import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEtudPage } from './home-etud.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEtudPage
  },
  {
    path: 'etud-seances',
    loadChildren: () => import('./etud-seances/etud-seances.module').then( m => m.EtudSeancesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEtudPageRoutingModule {}
