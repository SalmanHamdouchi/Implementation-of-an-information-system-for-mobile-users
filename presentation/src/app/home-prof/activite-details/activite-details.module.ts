import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActiviteDetailsPageRoutingModule } from './activite-details-routing.module';
import { ActiviteDetailsPage } from './activite-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ActiviteDetailsPageRoutingModule
  ],
  declarations: [ActiviteDetailsPage]
})
export class ActiviteDetailsPageModule {}
