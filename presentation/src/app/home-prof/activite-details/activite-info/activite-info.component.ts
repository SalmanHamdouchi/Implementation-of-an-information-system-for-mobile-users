import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Activite } from '../../../models/activite';

@Component({
  selector: 'app-activite-info',
  templateUrl: './activite-info.component.html',
  styleUrls: ['./activite-info.component.scss'],
})
export class ActiviteInfoComponent implements OnInit {

  public activiteTableTime: Array<any>;
  public activite: Activite;

  constructor(public navParams: NavParams, public popoverCtrl: PopoverController) { 
    this.activite = this.navParams.get('activite');
    this.activiteTableTime = this.navParams.get('activiteTableTime');
  }

  ngOnInit() {}

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

}
