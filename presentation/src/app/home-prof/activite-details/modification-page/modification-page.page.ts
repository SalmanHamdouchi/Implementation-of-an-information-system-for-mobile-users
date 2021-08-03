import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActiviteService } from 'src/app/services/activite.service';
import { Seance } from '../../../models/seance';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modification-page',
  templateUrl: './modification-page.page.html',
  styleUrls: ['./modification-page.page.scss'],
})
export class ModificationPagePage implements OnInit {

  private form: FormGroup;
  private formValid = true;
  public seance : Seance;
  public seanceTime:any;
  public seanceDate:any;
  public seanceFin:any;
  public note:any;
  private seances: Array<Seance>;

  constructor(private formBuilder: FormBuilder, 
              private activiteService: ActiviteService,
              private activated: ActivatedRoute,
              private toastController:ToastController,
              private location:Location) {

   // this.seances = activiteService.seances;
    //console.log(this.seances)
  /*  activiteService.getSeance(+this.activated.snapshot.paramMap.get('seanceId')).subscribe((result) => {
     
    }, err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.'));
      */
      this.seance = this.activiteService.seance;
       this.seanceDate = new Date(this.seance.date).toISOString().split('T')[0];
      
       this.seanceTime = this.seance.date.substring(11);
     //  console.log(this.seanceDate)
       this.seanceFin=this.seance.hourEnd;
  
      // console.log(this.seanceFin);
 
       this.note = this.seance.description;
       this.form = this.formBuilder.group({
         date: ['', Validators.required],
         note : ['', Validators.required],
         debutS : ['', Validators.required],
         finS : ['', Validators.required]
       });
  }

  ngOnInit() {}

  async updateSeance(){
    if (this.form.valid) {

      let date=this.form.value.date + ' ' + this.form.value.debutS;
      let hourEnd=this.form.value.finS;
      let description=this.form.value.note;
      let pres=this.seance.presences;
      this.activiteService.updateSeance({
        id: this.seance.id,
        date:  date,
        hourEnd: hourEnd,
        description: description,
        presences: pres
      },this.activated.snapshot.paramMap.get('activiteId')).
      subscribe(res=>{
        this.activiteService.seance.date=date;
        this.activiteService.seance.description=description;
        this.activiteService.seance.hourEnd=hourEnd;
        this.activiteService.seance.presences=pres;
        this.showToast();
      });
    }
     else{
      this.formValid = false;
    }
  }

  async showToast(){
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2500,
      message: 'Seance modifié',
    });
    toast.style.cssText = "font-size: 16px;--width: 175px;text-align:center";
    await toast.present();

  }

  getForm(): FormGroup{
    return this.form;
  }

  getFormValid(){
    return this.formValid;
  }

  goBack(){
    this.location.back();
  }
}

