import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPowerAutomatePerFlowComponent } from './ms-power-automate-per-flow.component';

describe('MsPowerAutomatePerFlowComponent', () => {
  let component: MsPowerAutomatePerFlowComponent;
  let fixture: ComponentFixture<MsPowerAutomatePerFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsPowerAutomatePerFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPowerAutomatePerFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
