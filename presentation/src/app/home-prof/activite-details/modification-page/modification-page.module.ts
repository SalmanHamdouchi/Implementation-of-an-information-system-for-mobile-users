import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModificationPagePageRoutingModule } from './modification-page-routing.module';
import { ModificationPagePage } from './modification-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModificationPagePageRoutingModule
  ],
  declarations: [ModificationPagePage]
})
export class ModificationPagePageModule {}
