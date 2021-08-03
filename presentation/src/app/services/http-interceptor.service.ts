import { Injectable } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import { LoadingController, ToastController } from '@ionic/angular';
import { retryWhen, delay, take, tap, map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private toastCtrl:ToastController, private authenticationService: AuthentificationService,private loadingCtrl:LoadingController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let l:LoadingComponent=new LoadingComponent();

    
  this.loadingCtrl.getTop().then(hashLoading=>{
    if(!hashLoading){
      this.loadingCtrl.create({
        spinner:'crescent',
        message:'Chargement',
        duration: 3000,
        translucent:true
      }).then(loading=>loading.present());
    }
  })
    if (!req.headers.has('Authorization')) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: this.authenticationService.basicauth
        }
      });
   //   console.log(sessionStorage.getItem('basicauth'));
      return next.handle(authReq).pipe(finalize(()=>{
        this.loadingCtrl.getTop().then(hashLoading=>{
          if(hashLoading){
            this.loadingCtrl.dismiss();
          }
        })
        
      }))

    } else {
      return next.handle(req).pipe(finalize(()=>{
        this.loadingCtrl.getTop().then(hashLoading=>{
          if(hashLoading){
            this.loadingCtrl.dismiss();
          }
        })
        
      }));
    }
  }
 
}
