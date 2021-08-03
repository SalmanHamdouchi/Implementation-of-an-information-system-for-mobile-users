import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificationPagePage } from './modification-page.page';

const routes: Routes = [
  {
    path: '',
    component: ModificationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificationPagePageRoutingModule {}
