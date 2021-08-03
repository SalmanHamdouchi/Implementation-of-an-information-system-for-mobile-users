import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from './authentification.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthentificationService, private router: Router, private sessionStorage: Storage
  ) {}

  async canActivate():  Promise<boolean> {
      if(this.authService.authenticatedUser=="undefined")
      {
        let promise1= await this.sessionStorage.get('id').then(value=>{this.authService.id=value });
        let promise2= await this.sessionStorage.get('prenom').then(value=>{this.authService.prenom=value });
        let promise3= await this.sessionStorage.get('basicauth').then(value=>{this.authService.basicauth=value });
        let promise4= await this.sessionStorage.get('authenticatedUser').then(value=>{this.authService.authenticatedUser=value });
        let promise5= await this.sessionStorage.get('type').then(value=>{this.authService.type=value });
      }
        /*Promise.all([promise1,promise2,promise3,promise4,promise5]).then(value=>
         {
           if (this.isUserLoggedIn()) {
              
             if (this.type === 'etudiant'){
               this.router.navigate(['home-etud']);
             }
     
             else if (this.type === 'professeur'){
               this.router.navigate(['home-prof']);
             }
     
           }
         })
      }*/
      if (!this.authService.isUserLoggedIn()){
        this.router.navigate(['login']);
      }
      return true;
  }

}
