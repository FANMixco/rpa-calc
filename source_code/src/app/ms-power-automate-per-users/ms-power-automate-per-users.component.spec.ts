import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPowerAutomatePerUsersComponent } from './ms-power-automate-per-users.component';

describe('MsPowerAutomatePerUsersComponent', () => {
  let component: MsPowerAutomatePerUsersComponent;
  let fixture: ComponentFixture<MsPowerAutomatePerUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsPowerAutomatePerUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPowerAutomatePerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
