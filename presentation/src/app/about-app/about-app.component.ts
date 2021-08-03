import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';

@Component({
  selector: 'about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.scss'],
})
export class AboutAppComponent implements OnInit {

  constructor(public popoverCtrl: PopoverController) { }

  ngOnInit() {}

   async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }
}
