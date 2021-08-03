import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbscencePage } from './abscence.page';

describe('AbscencePage', () => {
  let component: AbscencePage;
  let fixture: ComponentFixture<AbscencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbscencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbscencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
