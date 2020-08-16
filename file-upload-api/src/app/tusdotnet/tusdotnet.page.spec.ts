import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TusdotnetPage } from './tusdotnet.page';

describe('TusdotnetPage', () => {
  let component: TusdotnetPage;
  let fixture: ComponentFixture<TusdotnetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusdotnetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TusdotnetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
