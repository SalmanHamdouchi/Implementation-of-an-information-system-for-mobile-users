import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/models/activite';
import { Seance } from 'src/app/models/seance';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from 'src/app/services/activite.service';
import { Presance } from '../../models/presance';
import { webService } from 'src/app/services/webService';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-etud-seances',
  templateUrl: './etud-seances.page.html',
  styleUrls: ['./etud-seances.page.scss'],
})
export class EtudSeancesPage implements OnInit {
  activite: Activite;
  seances: Array<Seance>;
  nomActivite: string;
  imageUrl: string;
  presence: Presance;
  id : any;

  constructor( private activated: ActivatedRoute,
              private activiteService: ActiviteService, private router: Router,private authenSer:AuthentificationService) {
    this.activiteService.getActiviteForEtudiant(+this.activated.snapshot.paramMap.get('id')).subscribe(activite => {
      this.activite = activite;
      console.log(activite);
      this.nomActivite =activite.nom;
   //   t.ligneNvMatiere.matiere.photo = 
      this.imageUrl = webService.url2+'/matieres/photo/'+this.activite.ligneNvMatiere.matiere.nom;
      
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));

    this.activiteService.getSeancesForEtudiant(+this.activated.snapshot.paramMap.get('id')).subscribe(seances => {
      this.seances = seances;
      this.id = +this.authenSer.id;
      // this.seances.map(seance =>{
      //   seance.presences.map(presence=>{
      //     if(presence.id==+sessionStorage.getItem('id'))
      //       this.presence =  presence;
      //   })
      // })
      console.log(seances);
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));
  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['home-etud']);
  }
  changeBackground(val): any {
    if(!val)
    return { 'background-color': "#CD5C5C" };
}
}
