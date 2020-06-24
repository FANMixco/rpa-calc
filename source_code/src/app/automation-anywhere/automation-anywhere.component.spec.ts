import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationAnywhereComponent } from './automation-anywhere.component';

describe('AutomationAnywhereComponent', () => {
  let component: AutomationAnywhereComponent;
  let fixture: ComponentFixture<AutomationAnywhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationAnywhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationAnywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
