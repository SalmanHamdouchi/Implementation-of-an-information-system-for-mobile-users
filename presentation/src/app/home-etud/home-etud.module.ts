import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeEtudPageRoutingModule } from './home-etud-routing.module';

import { HomeEtudPage } from './home-etud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEtudPageRoutingModule
  ],
  declarations: [HomeEtudPage]
})
export class HomeEtudPageModule {}
