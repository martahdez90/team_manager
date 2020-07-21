import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsPlayerComponent } from './trainings-player.component';

describe('TrainingsPlayerComponent', () => {
  let component: TrainingsPlayerComponent;
  let fixture: ComponentFixture<TrainingsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
