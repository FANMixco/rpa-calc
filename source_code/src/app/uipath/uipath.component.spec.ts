import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UipathComponent } from './uipath.component';

describe('UipathComponent', () => {
  let component: UipathComponent;
  let fixture: ComponentFixture<UipathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UipathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UipathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
