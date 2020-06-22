import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPowerAutomatePricesComponent } from './ms-power-automate-prices.component';

describe('MsPowerAutomatePricesComponent', () => {
  let component: MsPowerAutomatePricesComponent;
  let fixture: ComponentFixture<MsPowerAutomatePricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsPowerAutomatePricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPowerAutomatePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
