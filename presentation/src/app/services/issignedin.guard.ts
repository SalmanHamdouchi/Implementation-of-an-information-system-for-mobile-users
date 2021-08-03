import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from './authentification.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class IssignedinGuard implements CanActivate {

  constructor(private authService: AuthentificationService, private router: Router
    ,private sessionStorage: Storage) {
  }

  async canActivate(): Promise<boolean> {
    //  console.log("ici22222"+this.authService.authenticatedUser)
      //this.authService.show();
      if(this.authService.authenticatedUser=="undefined")
      {
        let promise1= await this.sessionStorage.get('id').then(value=>{this.authService.id=value });
        let promise2= await this.sessionStorage.get('prenom').then(value=>{this.authService.prenom=value });
        let promise3= await this.sessionStorage.get('basicauth').then(value=>{this.authService.basicauth=value });
        let promise4= await this.sessionStorage.get('authenticatedUser').then(value=>{this.authService.authenticatedUser=value });
        let promise5= await this.sessionStorage.get('type').then(value=>{this.authService.type=value });
      }

      if (this.authService.isUserLoggedIn()) {
         
        if (this.authService.type === 'etudiant'){
          this.router.navigate(['home-etud']);
        }

        else if (this.authService.type === 'professeur'){
          this.router.navigate(['home-prof']);
        }
        return false;

      }
      return true;
    }
}
