import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTasksComponent } from './total-tasks.component';

describe('TotalTasksComponent', () => {
  let component: TotalTasksComponent;
  let fixture: ComponentFixture<TotalTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
