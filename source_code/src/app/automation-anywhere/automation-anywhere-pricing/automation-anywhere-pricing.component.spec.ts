import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationAnywherePricingComponent } from './automation-anywhere-pricing.component';

describe('AutomationAnywherePricingComponent', () => {
  let component: AutomationAnywherePricingComponent;
  let fixture: ComponentFixture<AutomationAnywherePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationAnywherePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationAnywherePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
