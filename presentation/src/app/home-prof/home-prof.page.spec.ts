import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeProfPage } from './home-prof.page';

describe('HomeProfPage', () => {
  let component: HomeProfPage;
  let fixture: ComponentFixture<HomeProfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
