import {
  Component,
  OnInit
} from '@angular/core';
import {
  Seance
} from '../../../models/seance';
import {
  ActiviteService
} from 'src/app/services/activite.service';
import {
  ActivatedRoute, Router
} from '@angular/router';

import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-abscence',
  templateUrl: './abscence.page.html',
  styleUrls: ['./abscence.page.scss'],
})
export class AbscencePage implements OnInit {
  elem: HTMLElement;
  parentElement: HTMLElement;
  absences: any;
  seance: Seance;

  constructor(
    private activiteService: ActiviteService,
    private activated: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastController:ToastController
    ) {
    this.activiteService.getSeanceAvecPresence(+this.activated.snapshot.paramMap.get('seanceId')).subscribe(seance => {
      this.seance = this.activiteService.seance;
      this.seance.presences = seance.presences;
    }, err => console.log('HTTP Error', err), () => console.log('HTTP request completed.'));
  }

  ngOnInit() {}

  updateParentElement(event) {
    this.elem = event.target;
    this.parentElement = this.elem.parentElement.parentElement;
  }

  showNoteInput(event) {
    this.updateParentElement(event);
    this.parentElement.querySelector('.noteInputHolder')
      .setAttribute('style', 'transform:translateY(0); height:41px; overflow:hidden;margin-top: 15px;');
  }

  hideNoteInput(event) {
    this.updateParentElement(event);

    this.parentElement.querySelector('.noteInputHolder').setAttribute('style', 'height:0px; overflow:hidden;transform:translateY(0);');
  }

  marquerAbscence() {
    this.absences = document.getElementsByClassName('etudiant');
    let presences = this.seance.presences;
    for (const ab of this.absences) {
      let objIndex = presences.indexOf(presences.find(obj => obj.id == ab.id));
      presences[objIndex].absent = ab.querySelector('ion-checkbox').checked;
      presences[objIndex].remarque = ab.querySelector('ion-input').value;
    }

    this.showToast()
    this.activiteService.marquerAbsence(presences, this.seance.id).subscribe((result) => {
      console.log(result);
      window.location.reload();
      this.goBack();
    }, err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.'));
  }

  async showToast(){
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2500,
      message: 'Abscence marqué',
    });
    toast.style.cssText = "font-size: 16px;--width: 195px;text-align:center";
    await toast.present();

  }

  goBack(){
    this.location.back();
  }
}
