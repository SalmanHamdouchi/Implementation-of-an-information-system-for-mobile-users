import { Component, OnInit } from '@angular/core';
import { Activite } from '../models/activite';
import { ActiviteService } from '../services/activite.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { webService } from '../services/webService';
import { PopoverController } from '@ionic/angular';
import { AboutAppComponent } from '../about-app/about-app.component';

@Component({
  selector: 'app-home-prof',
  templateUrl: './home-prof.page.html',
  styleUrls: ['./home-prof.page.scss'],
})
export class HomeProfPage implements OnInit {
  activities: Activite[];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  searchValue: string;
  prenom: string;
  searchedDays:Set<string>;
  days:Set<string>;
  aboutAppPopover: any;
  constructor(private activiteService: ActiviteService, private router: Router,
    private authenticationService: AuthentificationService, public popoverCtrl: PopoverController) {
     
  }
public initPage(){
  this.days=new Set<string>();
  this.searchedDays=new Set<string>();
  console.log("heeeere"+ this.authenticationService.prenom)
this.prenom = this.authenticationService.prenom;
this.activiteService.getActivites().subscribe(activities => {
  this.activities = activities;
  
  activities.forEach(t => {
    
    if (t!=null && t.ligneNvMatiere != null){
      this.days.add(t.horraires[0].jour.nom);
     
      console.log(JSON.stringify(t));
      //https://www.institutjamai.com/webService1/matieres/photo/Piano
      t.ligneNvMatiere.matiere.photo = webService.url2+'/matieres/photo/'+t.ligneNvMatiere.matiere.nom;
    }
  });
  this.days.forEach(d => {
    this.addToDays(d);
  });
}, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));
}
  ngOnInit() {

  }
  ionViewWillEnter(){
    this.initPage();
  
}

  public getHoraire(horraires:Array<any>):string
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
  isChecked(day){
    return this.searchedDays.has(day); 
  }
  addToDays(day){
if(this.searchedDays.has(day))
this.searchedDays.delete(day);
else
this.searchedDays.add(day);
this.searchActivities();
  }
  searchActivities(){
    
    let activities:any = document.getElementsByClassName("activiteHolder");
    for(let activite of activities){
     
      let found=0;
      this.searchedDays.forEach(day => {
        if(activite.innerText.toLowerCase().search(day)!=-1)
        {
          console.log("helo")
        found=1;
        }
      });
      if(found==1){

      if(this.searchValue== undefined || activite.innerText.toLowerCase().search(this.searchValue.toLowerCase())!=-1){
        activite.style.display = "block"
      }
      else{
        activite.style.display = "none"
       
      }
    }
    else
    activite.style.display = "none"
    }
  }

  clearInput(){
    this.searchValue = '';
    this.searchActivities()
  }

  getActiviteDetail(id: number){
    this.router.navigate(['home-prof/activite-details/', id]);
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
