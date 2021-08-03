import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActiviteService } from 'src/app/services/activite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, PopoverController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Activite } from 'src/app/models/activite';
import { Horraire } from '../../../models/horraire';
import { Seance } from 'src/app/models/seance';

@Component({
  selector: 'app-addition-form',
  templateUrl: './addition-form.component.html',
  styleUrls: ['./addition-form.component.scss'],
})
export class AdditionFormComponent implements OnInit {

  private form: FormGroup;
  private formValid = true;
  private activite: Activite;
  private seances: Array<Seance>;
  public dateSuggestedToString: any;
  public horraires : Array<Horraire>;
  public hourStartSuggested: any;
  public hourEndSuggested: any;

  constructor(private formBuilder: FormBuilder, private activiteService: ActiviteService,
              private popOverCtrl: PopoverController, private navParams: NavParams,
              private toastController:ToastController, private router: Router) {
    this.seances =  this.navParams.get('seances');
    this.activiteService.getActivite(this.navParams.get('id')).subscribe(activite => {
      this.activite = activite;
      this.horraires = activite.horraires;
     // this.nextDay(Array.from(new Set(this.horraires.map(t => t.jour.nom))));
     // this.getSeanceTime(this.nextDay(
     //   Array.from(new Set(this.horraires.map(t => t.jour.nom)))
     // ));
      this.activite.image = this.activiteService.convertToSrc(activite.image);
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      note : [''],
      debutS : ['', Validators.required],
      finS : ['', Validators.required]
    });


  }

  ngOnInit() {
  }


  /*nextDay(day: any) :any{

    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    day.map(d => {
      d = d.toLowerCase();
    })
    let currentDate = new Date();
    let today = currentDate.getDay();

    let allDaysUntilNext = [];

    for (let i = 7; i--;) {
      for (let j = day.length; j--;){

        if (day[j] == days[i]) {
          day[j] = (i < today) ? (i + 7) : i;
          // console.log(day[j]);

          break;
        }
      }
    }

    for (let j = day.length; j--;){
      let daysUntilNext = day[j] - today;
      console.log(daysUntilNext)
      allDaysUntilNext.push(daysUntilNext);
    }

    let minDaysUntilNext = Math.min(...allDaysUntilNext);

    let self = this;
    let maxDate :Date = null;
    function getNextDate(minDaysUntilNext: number): any{

      let newDate: any = new Date().setDate(currentDate.getDate() + minDaysUntilNext);
      let dateSuggested = new Date(newDate);

      if(self.activite.seances.length == 0)
        return [dateSuggested];

      else
        return self.activite.seances.map(s => {
          if (new Date(s.date).getMonth() == dateSuggested.getMonth() && new Date(s.date).getDate() == dateSuggested.getDate()) {
            let secondMinDaysUntilNext = Math.min.apply(null, allDaysUntilNext.filter(n => n != minDaysUntilNext));
            // console.log(secondMinDaysUntilNext)
            if(isFinite(secondMinDaysUntilNext) == true)
              getNextDate(secondMinDaysUntilNext);
          }
          if(maxDate == null)
            maxDate = new Date(dateSuggested.getTime());

          if(dateSuggested > maxDate)
            maxDate = new Date(dateSuggested.getTime());
          return dateSuggested > maxDate ? dateSuggested:maxDate;
        });
    }
    // console.log(getNextDate(minDaysUntilNext))
    let dateSuggested =  new Date(getNextDate(minDaysUntilNext).reduce(function (a, b) { return a > b ? a : b; }) - (new Date().getTimezoneOffset() * 60000));
   // console.log("dateSuggested is " + dateSuggested)
    this.dateSuggestedToString = dateSuggested.toISOString().substr(0, 10);
    let dayInFrench = days[ new Date(this.dateSuggestedToString).getDay() ];
    return dayInFrench;
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
    this.hourStartSuggested = horraires[0].toLocaleTimeString();
    horraires[horraires.length - 1].setMinutes(horraires[horraires.length - 1].getMinutes()+30);
    this.hourEndSuggested = horraires[horraires.length - 1].toLocaleTimeString();
   // console.log(horraires[0].getHours()+':'+horraires[0].getMinutes());
  }
*/
//data{"id":null,"date":"2020-11-11 15:00","hourEnd":"15:30","description":"sdfsf","presences":[]}
//data{"id":null,"date":"2020-11-12 2020-11-12T13:00:53.522+01:00","hourEnd":"2020-11-12T13:30:53.523+01:00","description":"eeeee","presences":[]}
  async addSeance(){
    if (this.form.valid) {
     console.log(JSON.stringify(this.form.value.debutS).substring(12,17));
      this.activiteService.addSeance({
        id: null,
        date:  this.form.value.date + ' ' + JSON.stringify(this.form.value.debutS).substring(12,18),
        hourEnd:JSON.stringify(this.form.value.finS).substring(12,17),
        description: this.form.value.note,
        presences: []
      }, this.navParams.get('id')).subscribe((result) => {

        this.showToast()
        
        this.activiteService.getSeances(this.activite.id).subscribe(seances => {
          seances.map(s => {

            let unexistedSeance = this.seances.filter( localSeance => localSeance.id == s.id )
         //   console.log(unexistedSeance)
            
            if(unexistedSeance == undefined || unexistedSeance == [] || unexistedSeance.length == 0)
            {this.seances.push(s)
        //    console.log("okiiiii")
      }
             
          }) 
        })
      }, err => console.log('HTTP Error', err),
          () => console.log('HTTP request completed.'));
    }else{
      this.formValid = false;
    }
  }

  async showToast(){
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2500,
      message: 'Seance ajouté',
    });
    toast.style.cssText = "font-size: 16px;--width: 170px;text-align:center";
    
    await toast.present();

    this.dismissPopover()
  }
  getForm(): FormGroup{
    return this.form;
  }

  getFormValid(){
    return this.formValid;
  }

  async dismissPopover() {
    await this.popOverCtrl.dismiss();
  }
}
