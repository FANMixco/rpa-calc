import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationAnywhereCloudComponent } from './automation-anywhere-cloud.component';

describe('AutomationAnywhereCloudComponent', () => {
  let component: AutomationAnywhereCloudComponent;
  let fixture: ComponentFixture<AutomationAnywhereCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationAnywhereCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationAnywhereCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
