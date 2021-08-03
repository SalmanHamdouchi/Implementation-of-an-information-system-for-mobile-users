import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtudSeancesPage } from './etud-seances.page';

describe('EtudSeancesPage', () => {
  let component: EtudSeancesPage;
  let fixture: ComponentFixture<EtudSeancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudSeancesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtudSeancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
