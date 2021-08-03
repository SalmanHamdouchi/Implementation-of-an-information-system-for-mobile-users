import {
  Component,
  OnInit
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Etudiant } from '../models/etudiant';
import {AuthentificationService} from '../services/authentification.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private form: FormGroup;
  private prof: any;
  private etudiant_: Etudiant;
  private successMessage: string;
  private invalidLogin = true;
  private loginSuccess = false;
  private etudiant = false;
  private professeur = false;
  private profColBorder = '';
  private etudColBorder = '';
  private formValid = true;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService,private storage:Storage) {
  /*  this.form = this.formBuilder.group({
      mail: ['', Validators.compose([
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required
      ])],
      password: ['', Validators.required],
      staffChoice: ['', Validators.required]
    });*/
    this.form = this.formBuilder.group({
      mail: ['', Validators.required
      ],
      password: ['', Validators.required],
      staffChoice: ['', Validators.required]
    });
  }

  async login() {
    if (this.form.valid) {
      this.formValid = true;
      if (this.form.value.staffChoice != 'etudiant') {
        this.authenticationService.authenticationService(this.form.value.mail, this.form.value.password).subscribe((result) => {
            this.successMessage = 'Login Successful.';
            this.prof = result;
            this.storage.set('type', this.form.value.staffChoice);
            this.authenticationService.type=this.form.value.staffChoice;
            this.router.navigate(['home-prof']);
            this.invalidLogin = true;
          }, err => {
            console.log('HTTP Error', err);
            this.invalidLogin = false;
          },
          () => console.log('HTTP request completed.'));

      }else{
        this.authenticationService.authenticationServiceForEtudiant(this.form.value.mail, this.form.value.password).subscribe((result) => {
          this.successMessage = 'Login Successful.';
          this.etudiant_ = result;
      //    console.log(this.form.value.staffChoice);
          this.storage.set('type', this.form.value.staffChoice);
          this.authenticationService.type=this.form.value.staffChoice;
          this.router.navigate(['home-etud']);
          this.invalidLogin = true;
        }, err => {
          console.log('HTTP Error', err);
          this.invalidLogin = false;
        },
        () => console.log('HTTP request completed.'));
      }
    } else {
      this.formValid = false;
    }

  }

  ngOnInit() {}

  getForm(): FormGroup {
    return this.form;
  }

  toggleRadio(type: string) {

    if (type === 'prof') {
      this.professeur = true;
      this.etudiant = false;
      this.profColBorder = 'colBorder';
      this.etudColBorder = '';
    } else if (type === 'etud') {
      this.professeur = false;
      this.etudiant = true;
      this.etudColBorder = 'colBorder';
      this.profColBorder = '';
    }
  }
  getProfColBorder(): string {
    return this.profColBorder;
  }
  getEtudColBorder(): string {
    return this.etudColBorder;
  }
  getEtudiant(): boolean {
    return this.etudiant;
  }
  getProfesseur(): boolean {
    return this.professeur;
  }
 
  getFormValid() {
    return this.formValid;
  }
  getLoginValid() {
    return this.invalidLogin;
  }
}