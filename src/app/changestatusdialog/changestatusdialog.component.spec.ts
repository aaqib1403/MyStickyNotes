import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangestatusdialogComponent } from './changestatusdialog.component';

describe('ChangestatusdialogComponent', () => {
  let component: ChangestatusdialogComponent;
  let fixture: ComponentFixture<ChangestatusdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangestatusdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangestatusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
