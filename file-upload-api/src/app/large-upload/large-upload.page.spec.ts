import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LargeUploadPage } from './large-upload.page';

describe('LargeUploadPage', () => {
  let component: LargeUploadPage;
  let fixture: ComponentFixture<LargeUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LargeUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
