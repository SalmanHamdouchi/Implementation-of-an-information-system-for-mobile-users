import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
import { webService } from './webService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: string;
  public password: string;
  public id;
  public prenom;
  public basicauth;
  public authenticatedUser="undefined";
  public type;

  constructor(private http: HttpClient , private sessionStorage: Storage,private router: Router) {
   
  //  setInterval(this.show,5000);
  }

  authenticationService(username: string, password: string): Observable<any>{
    const apiCall  = webService.url+'/login/' + username.toString();
    return this.http.get<any>(apiCall,
      { headers: { 'Authorization': this.createBasicAuthToken(username, password),
      'Content-Type' : 'application/json'
    }}).pipe(
        map((res) => {
        this.username = username;
        this.password = password;
        this.sessionStorage.set('prenom', res.prenom);
        this.prenom=res.prenom;
        this.registerSuccessfulLogin(username, password);
      },
      catchError((error: any) => {console.log(error); return throwError(error); })
      ));
  }

  authenticationServiceForEtudiant(username: string, password: string): Observable<any>{
    const apiCall  = webService.url+'/loginetudiant/' + username.toString();
    return this.http.get<any>(apiCall,
      { headers: { 'Authorization': this.createBasicAuthToken(username, password),
      'Content-Type' : 'application/json'
    }}).pipe(
        map((res) => {
        this.username = username;
        this.password = password;
        
        this.sessionStorage.set('prenom', res.prenom);
        this.prenom=res.prenom;
        this.sessionStorage.set('id', res.id);
        this.id=res.id;
       // console.log("ooook"+ res)
        this.registerSuccessfulLogin(username, password);
      },
      catchError((error: any) => {console.log(error); return throwError(error); })
      ));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  async registerSuccessfulLogin(username: string, password: string) {
    this.sessionStorage.set(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.authenticatedUser=username;
    this.basicauth=  this.createBasicAuthToken(username, password);
    this.sessionStorage.set('basicauth', this.basicauth);
  }

  logout() {
    //substring(0,webService.url.lastIndexOf('/'))
   let p1= this.sessionStorage.remove('authenticatedUser');
   let p2= this.sessionStorage.remove('basicauth');
    let p3= this.sessionStorage.remove('prenom');
   let p4= this.sessionStorage.remove('id');
   let p5= this.sessionStorage.remove('type');
   Promise.all([p1,p2,p3,p4,p5]).then(value=> 
    {
      this.authenticatedUser=null;
     // this.basicauth=null;
      this.prenom=null;
      this.id=null;
      this.type=null;
      this.http.post(webService.url+'/leave','',{ headers: { 'Authorization': this.basicauth,
      'Content-Type' : 'application/json'
    }}).subscribe(value=>{this.router.navigate(['/login'])});
    }
    )
  
  }

  isUserLoggedIn() {
    let user = this.authenticatedUser;
    if (user === undefined|| user ===null) { return false; }
    return true;
  }

  getLoggedInUserName() {
    let user = this.authenticatedUser;
    if (user === undefined || user ===null) { return ''; }
    return user;
  }

}
