import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UipathPaymentComponent } from './uipath-payment.component';

describe('UipathPaymentComponent', () => {
  let component: UipathPaymentComponent;
  let fixture: ComponentFixture<UipathPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UipathPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UipathPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
