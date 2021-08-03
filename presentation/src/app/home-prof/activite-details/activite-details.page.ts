import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Activite } from 'src/app/models/activite';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Seance } from '../../models/seance';
import { ActiviteService } from 'src/app/services/activite.service';
import { AdditionFormComponent } from './addition-form/addition-form.component';
import { Horraire } from '../../models/horraire';
import { ActiviteInfoComponent } from './activite-info/activite-info.component';
import { webService } from 'src/app/services/webService';

@Component({
  selector: 'app-activite-details',
  templateUrl: './activite-details.page.html',
  styleUrls: ['./activite-details.page.scss'],
})
export class ActiviteDetailsPage implements OnInit {
  public activite: Activite;
  public imageUrl: any;
  public nomActivite: any;
  public seances: Array<Seance>;
  public popover:any;
  public activiteInfoPopover: any;
  public days:any;
  public horraires: Array<Horraire>;
  public activiteTableTime = [];
public schedule;
  @ViewChild('activiteInfo', {static: true, read: ElementRef}) activiteInfo: ElementRef;
  @ViewChild('backButton', {static: true, read: ElementRef}) backButtonView: ElementRef;

  constructor(public popoverCtrl: PopoverController, private activated: ActivatedRoute,
              private activiteService: ActiviteService, private router: Router) {
    this.activiteService.getActivite(+this.activated.snapshot.paramMap.get('id')).subscribe(activite => {
      this.activite = activite;
      //this.imageUrl = activite.ligneNvMatiere.matiere.photo;
      this.imageUrl= webService.url2+'/matieres/photo/'+activite.ligneNvMatiere.matiere.nom;
      this.nomActivite = activite.nom;
      this.activite.nom = activite.nom;
      this.horraires = activite.horraires;
      this.schedule=this.getHoraire(this.horraires);
      this.activite.ligneNvMatiere.matiere.nom = activite.ligneNvMatiere.matiere.nom;
      this.activite.ligneNvMatiere.niveau.nv = activite.ligneNvMatiere.niveau.nv;
      console.log(activite);
      this.days = Array.from(new Set(activite.horraires.map(t => t.jour.nom)));
      this.days.map((r: any)=>{
        let paragraph  = `${r} : ${this.getSeanceTime(r)}`;
        this.activiteTableTime.push(paragraph);
      });
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));

    this.activiteService.getSeances(+this.activated.snapshot.paramMap.get('id')).subscribe(seances => {
      this.seances = seances;
      // activiteService.seances = this.seances;
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
  ngOnInit() {
    // console.log("resizing fun called")

    let seancesList:any = document.getElementById('seancesList');
    let seancesListHeight = (document.documentElement.clientHeight*321)/731;
    seancesList.style.height = seancesListHeight + "px";
    
    let seancesHolder:any = document.getElementById('seancesHolder');
    let seancesHolderMargin = (document.documentElement.clientHeight*65)/731;
    seancesHolder.style.marginTop = "-" + seancesHolderMargin + "px";

    let notes:any = document.getElementsByClassName('note');
    for(let note of notes){
      note.style.width = (document.documentElement.clientHeight*250)/375;
    }
  }

  ngAfterViewInit() {
    const cssRule = 'filter: drop-shadow( 0px 2px 2px rgba(0, 0, 0, 0.7));'
    try {
      const sheet = new CSSStyleSheet();
      
      sheet.insertRule ? sheet.insertRule(`svg {${cssRule}}`) : sheet.addRule( `svg`, cssRule);
      this.backButtonView.nativeElement.shadowRoot.adoptedStyleSheets =
          this.backButtonView.nativeElement.shadowRoot.adoptedStyleSheets.concat([sheet]);
          
      } catch (e) { 
      const style = document.createElement('style');
      style.innerHTML = `svg {${cssRule}}`;
      this.backButtonView.nativeElement.shadowRoot.appendChild(style);
      }

    try {
      const sheet = new CSSStyleSheet();
      sheet.insertRule ? sheet.insertRule(`svg {${cssRule}}`) : sheet.addRule( `svg`, cssRule);
      this.activiteInfo.nativeElement.shadowRoot.adoptedStyleSheets =
          this.activiteInfo.nativeElement.shadowRoot.adoptedStyleSheets.concat([sheet]);
    } 
    catch (e) { 
      const style = document.createElement('style');
      style.innerHTML = `svg {${cssRule}}`;
      this.activiteInfo.nativeElement.shadowRoot.appendChild(style);
    }
      
  }

  async addSeanceForm(){
    this.popover = await this.popoverCtrl.create({
      component: AdditionFormComponent,
      animated: true,
      showBackdrop: true,
      componentProps: {
        id: +this.activated.snapshot.paramMap.get('id'),
        seances : this.seances},
      backdropDismiss:false
  });
  this.popover.style.cssText = '--min-width: 90%; --max-width: 90%;';

    return await this.popover.present();
  }

  async showPopover(ev: any, seance: Seance) {
    this.popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
      componentProps: {
        seance: seance,
        idActivite: this.activite.id,
        seances: this.seances
      }

    });
    this.popover.style.cssText = '--min-width: 220px; --max-width: 220px;';

    return await this.popover.present();
  }

  goBack(){
    this.router.navigate(['home-prof']);
  }


  getSeanceTime(day : any){
    let horraires = this.horraires.filter(t => t.jour.nom == day).map(t => {
      let date = new Date();
      date.setHours(+t.demiHeure.nom.split(':')[0]);
      date.setMinutes(+t.demiHeure.nom.split(':')[1]);
      date.setSeconds(0);
      return date;
    });
    horraires = horraires.sort((a, b) => {
      return a.getHours() - b.getHours() || a.getMinutes() - b.getMinutes();
    });
    let hourStartSuggested = horraires[0].toLocaleTimeString();
    horraires[horraires.length - 1].setMinutes(horraires[horraires.length - 1].getMinutes()+30);
    let hourEndSuggested = horraires[horraires.length - 1].toLocaleTimeString();
    return hourStartSuggested +' -> '+ hourEndSuggested;
  }
  
  async openActiviteInfo(ev: any) {
    this.activiteInfoPopover = await this.popoverCtrl.create({
      component: ActiviteInfoComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
      componentProps: {
        activiteTableTime: this.activiteTableTime,
        activite: this.activite
      }

    });
    this.activiteInfoPopover.style.cssText = '--min-width: 290px; --max-width: 290px;';

    return await this.activiteInfoPopover.present();
  }

 
}
