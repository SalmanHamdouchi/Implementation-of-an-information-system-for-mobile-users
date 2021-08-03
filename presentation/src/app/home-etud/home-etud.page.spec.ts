import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeEtudPage } from './home-etud.page';

describe('HomeEtudPage', () => {
  let component: HomeEtudPage;
  let fixture: ComponentFixture<HomeEtudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEtudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEtudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
