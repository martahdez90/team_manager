import { Component, OnInit } from '@angular/core';
import { Training } from "../../models/training";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {
  public games = [new Training('Entreno de 2' ,new Date(2020, 7, 15), 'Madird', 'Comntario de prueba'),
                  new Training('Entreno de prueba 4' ,new Date(2020, 6, 1), 'Londres', 'Comntario para probar'),
                  new Training('Entreno de prueba 6' ,new Date(2020, 6, 1), 'Londres', 'Comntario para probar')]
                  
  constructor() { }

  newWorkout(){
    this.games.push(new Training('Entreno de prueba' ,new Date(2050, 6, 1), 'Hawai', 'Comntario para probar'))
  }

  ngOnInit(): void {
  }

}
