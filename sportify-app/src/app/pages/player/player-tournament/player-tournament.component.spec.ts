import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentComponent } from './player-tournament.component';

describe('PlayerTournamentComponent', () => {
  let component: PlayerTournamentComponent;
  let fixture: ComponentFixture<PlayerTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
