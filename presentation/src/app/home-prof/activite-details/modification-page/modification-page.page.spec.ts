import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificationPagePage } from './modification-page.page';

describe('ModificationPagePage', () => {
  let component: ModificationPagePage;
  let fixture: ComponentFixture<ModificationPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
