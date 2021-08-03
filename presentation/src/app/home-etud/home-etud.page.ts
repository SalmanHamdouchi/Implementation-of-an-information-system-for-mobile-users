import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AboutAppComponent } from '../about-app/about-app.component';
import { Activite } from '../models/activite';
import { ActiviteService } from '../services/activite.service';
import { AuthentificationService } from '../services/authentification.service';
import { webService } from '../services/webService';
// import { AnyNaptrRecord } from 'dns';

@Component({
  selector: 'app-home-etud',
  templateUrl: './home-etud.page.html',
  styleUrls: ['./home-etud.page.scss'],
})
export class HomeEtudPage implements OnInit {
  searchValue: string;
  prenom: string;
  activities: Activite[];
  aboutAppPopover: any;

  constructor(private activiteService: ActiviteService, private router: Router,
              private authenticationService: AuthentificationService, public popoverCtrl: PopoverController) {
    this.prenom = this.authenticationService.prenom;
    this.activiteService.getActivitesByEtudiant().subscribe(activities => {
      this.activities = activities;
      console.log(activities);
      activities.forEach(t => {
        if (t.ligneNvMatiere != null){
          t.ligneNvMatiere.matiere.photo = webService.url2+'/matieres/photo/'+t.ligneNvMatiere.matiere.nom;
      
          //t.ligneNvMatiere.matiere.photo = t.ligneNvMatiere.matiere.photo;
        }
      });
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));
  }
  getHoraire(horraires:Array<any>):string
  {
    let day=horraires[0].jour.nom;
    let min:string=horraires[0].demiHeure.nom;
    let end="";
    let i=1;
    for(;i<horraires.length;i++)
    {
      if(min>horraires[i].demiHeure.nom)
        min=horraires[i].demiHeure.nom
    }
    let nbr=parseInt(min.substring(0,2));
    if(min.charAt(3)=='3')
    nbr+=0.5;
    nbr*=2;
    nbr+=i;
    end=Math.floor(nbr/2)+":";
    if(nbr%2==0)
    end+="00";
    else
    end+="30"

    return day+" ("+min+"->"+end+")";
  }
  ngOnInit(){

  }

  searchActivities(){

    let activities:any = document.getElementsByClassName("activiteHolder");
    for(let activite of activities){
      if(activite.childNodes[1].innerText.toLowerCase().includes(this.searchValue.toLowerCase())){
        activite.parentNode.style.display = "block"
      }
      else{
        activite.parentNode.style.display = "none"
      }
    }
   
  }
 
  clearInput(){
    this.searchValue = '';
  }

  getActiviteDetail(id: number){
    this.router.navigate(['home-etud/etud-seances/', id]);
  }

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  logout(){
    this.authenticationService.logout();
    
  }

  async openAboutApp(ev: any) {
    this.aboutAppPopover = await this.popoverCtrl.create({
      component: AboutAppComponent,
      event: ev,
      animated: true,
      showBackdrop: true,

    });
    this.aboutAppPopover.style.cssText = '--min-width: 290px; --max-width: 290px;';

    return await this.aboutAppPopover.present();
  }
}
