import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtudSeancesPageRoutingModule } from './etud-seances-routing.module';

import { EtudSeancesPage } from './etud-seances.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtudSeancesPageRoutingModule
  ],
  declarations: [EtudSeancesPage]
})
export class EtudSeancesPageModule {}
