import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ToastController } from '@ionic/angular';
import { ActiviteService } from 'src/app/services/activite.service';
import { Seance } from 'src/app/models/seance';

@Component({
  selector: 'app-deletion-form',
  templateUrl: './deletion-form.component.html',
  styleUrls: ['./deletion-form.component.scss'],
})
export class DeletionFormComponent implements OnInit {
  private seanceId: number;
  private seances: Array<Seance>;

  constructor(private popOverCtrl: PopoverController, 
    private navParams: NavParams,
    private activiteService:ActiviteService,
    private toastController:ToastController) {
    this.seanceId = this.navParams.get('idSeance');
    this.seances = this.navParams.get('seances');

   }

  ngOnInit() {}

  async deleteSeance(){
    this.activiteService.deleteSeance(this.seanceId).subscribe((result) => {
      this.activiteService.getSeances(this.navParams.get("activiteId")).subscribe(seances => {
        this.seances.map(s => {

          let existedSeance = seances.filter( bdSeance => bdSeance.id == s.id )
          console.log(existedSeance)
          
          if(existedSeance == undefined || existedSeance == [] || existedSeance.length == 0) this.seances.splice(this.seances.indexOf(s),1)
        }) 
      })

    }, err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.'));
        
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2500,
      message: 'Seance supprimé',
    });
    toast.style.cssText = "font-size: 16px;--width: 175px;text-align:center";
    await toast.present();

    this.dismissPopover();
  }

  async dismissPopover() {

    await this.popOverCtrl.dismiss();
  }

}
