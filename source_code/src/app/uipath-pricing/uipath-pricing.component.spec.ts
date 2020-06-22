import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UipathPricingComponent } from './uipath-pricing.component';

describe('UipathPricingComponent', () => {
  let component: UipathPricingComponent;
  let fixture: ComponentFixture<UipathPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UipathPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UipathPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
