import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeletionFormComponent } from '../deletion-form/deletion-form.component';
import { Seance } from 'src/app/models/seance';
import { ActiviteService } from 'src/app/services/activite.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  private seanceId: number;
  private activiteId: number;
  private seances: Array<Seance>;
  constructor(public popoverCtrl: PopoverController,
              public navParams: NavParams,
              private router: Router,
              private activiteService: ActiviteService)
  {
    this.seanceId = this.navParams.get('seance').id;
    this.activiteId = this.navParams.get('idActivite');
    this.seances = this.navParams.get('seances');
  }

  ngOnInit() {
  }

  async showModificationForm(ev: any) {
    this.dismissPopover()
    this.activiteService.seance = this.navParams.get('seance');
    this.router.navigate(['home-prof/activite-details/seance/modify/'+this.activiteId, {seanceId: this.seanceId}]);
  }

  async showDeletionModal() {
        this.dismissPopover()

    const popover = await this.popoverCtrl.create({
        component: DeletionFormComponent,
        animated: true,
        componentProps: {
          idSeance: this.seanceId,
          seances : this.seances,
          activiteId: this.activiteId
        }
    });

    popover.style.cssText = '--min-width: 90%; --max-width: 90%; --border-radius: 17px;';
    this.dismissPopover()
    return await popover.present();
  }

  marquerAbscence(){
    this.activiteService.seance = this.navParams.get('seance');
    this.router.navigate(['home-prof/activite-details/seance/abscence', { seanceId: this.seanceId }]);
    this.dismissPopover();
  }

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

}
