import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbscencePageRoutingModule } from './abscence-routing.module';

import { AbscencePage } from './abscence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbscencePageRoutingModule
  ],
  declarations: [AbscencePage]
})
export class AbscencePageModule {}
