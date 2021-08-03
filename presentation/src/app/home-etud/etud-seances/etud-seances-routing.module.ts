import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtudSeancesPage } from './etud-seances.page';

const routes: Routes = [
  {
    path: '',
    component: EtudSeancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtudSeancesPageRoutingModule {}
