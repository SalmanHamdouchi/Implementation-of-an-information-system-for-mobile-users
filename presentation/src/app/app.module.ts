import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './services/http-interceptor.service';
import { IonicStorageModule } from '@ionic/storage';
import { PopoverComponent } from './home-prof/activite-details/popover/popover.component';
import { AdditionFormComponent } from './home-prof/activite-details/addition-form/addition-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActiviteInfoComponent } from './home-prof/activite-details/activite-info/activite-info.component';
import { AdMobFree } from '@ionic-native/admob-free/ngx';


@NgModule({
  declarations: [AppComponent,PopoverComponent, AdditionFormComponent, ActiviteInfoComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot({ mode: 'md'}), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), ReactiveFormsModule, FormsModule],
  providers: [
    StatusBar,AdMobFree,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
