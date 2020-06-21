import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPowerAutomateComponent } from './ms-power-automate.component';

describe('MsPowerAutomateComponent', () => {
  let component: MsPowerAutomateComponent;
  let fixture: ComponentFixture<MsPowerAutomateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsPowerAutomateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPowerAutomateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
