import { Injectable } from '@angular/core';
import { Activite } from '../models/activite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Seance } from '../models/seance';
import { Presance } from '../models/presance';
import { webService } from './webService';


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  public API = webService.url;
  public seance :Seance;
  public seances :Array<Seance>;

  constructor(public http: HttpClient, private authenticationService: AuthentificationService) {
  }

  getActivite(id: number): Observable<Activite> {
    return this.http.get<Activite>(this.API + '/activite/' + id);
  }

  getActiviteForEtudiant(id: number): Observable<Activite> {
    return this.http.get<Activite>(this.API + '/etudactiviteetudiant/' + id);
  }
  
  
  getActivites(): Observable<Array<Activite>> {
    return this.http.get<Array<Activite>>(this.API + '/activitesprofesseur/' + this.authenticationService.getLoggedInUserName());
  }

  getActivitesByEtudiant(): Observable<Array<Activite>> {
    return this.http.get<Array<Activite>>(this.API + '/etudiant/activites/' + this.authenticationService.getLoggedInUserName());
  }

  getSeance(seanceId: any): Observable<Seance> {
    return this.http.get<Seance>(this.API + '/seance/' + seanceId);
  }

  getSeanceAvecPresence(seanceId: any): Observable<Seance> {
    return this.http.get<Seance>(this.API + '/seanceavecpresence/' + seanceId);
  }

  getSeances(activiteId: any): Observable<Array<Seance>> {
    return this.http.get<Array<Seance>>(this.API + '/activiteseances/' + activiteId);
  }
  getSeancesForEtudiant(activiteId: any): Observable<Array<Seance>> {
    return this.http.get<Array<Seance>>(this.API + '/etudactiviteseances/' + activiteId);
  }
  addSeance(reqData: Seance, activiteId: any): Observable<Seance>{
    console.log("data"+JSON.stringify(reqData));
    return this.http.post<Seance>(this.API + '/seance/' + activiteId, reqData);
  }

  marquerAbsence(reqData: Array<Presance>, seanceId: any): Observable<Array<Presance>>{
    return this.http.post<Array<Presance>>(this.API + '/presances/' + seanceId, reqData);
  }

  updateSeance(reqData: Seance, activiteId: any): Observable<Seance>{
    return this.http.put<Seance>(this.API + '/seance/' + activiteId, reqData);
  }

  deleteSeance(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.API + '/seance/'+id);
  }

  convertToSrc(img: any): any{
    return 'data:image/jpeg;base64,' + img;
  }

}
