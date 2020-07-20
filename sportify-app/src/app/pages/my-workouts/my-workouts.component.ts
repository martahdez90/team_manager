import { Component, OnInit } from '@angular/core';
import { Match } from "../../models/match";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {
  public games = [new Match(new Date(2020, 7, 15), 'Madird', 'Comntario de prueba'),
                  new Match(new Date(2020, 6, 1), 'Londres', 'Comntario para probar'),
                  new Match(new Date(2020, 6, 1), 'Londres', 'Comntario para probar')]
                  
  constructor() { }

  ngOnInit(): void {
  }

}
