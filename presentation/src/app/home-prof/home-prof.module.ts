import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProfPageRoutingModule } from './home-prof-routing.module';

import { HomeProfPage } from './home-prof.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeProfPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [HomeProfPage]
})
export class HomeProfPageModule {}
