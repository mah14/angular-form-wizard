import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWizardComponent } from './my-wizard.component';

describe('MyWizardComponent', () => {
  let component: MyWizardComponent;
  let fixture: ComponentFixture<MyWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
