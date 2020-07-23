import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { ExerciseService } from 'src/app/shared/exercise-service.service';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-my-exercises',
  templateUrl: './my-exercises.component.html',
  styleUrls: ['./my-exercises.component.css']
})
export class MyExercisesComponent implements OnInit {

  public dataBase:object
  public options = [
    {name: 'Calentamiento', value:'warmUp'},
    {name: 'Parte principal', value:'main'},
    {name: 'Vuelta a la calma', value:'coolDown'}
  ]

  constructor(private loginService: LoginService, private exService: ExerciseService) { }

  public postEx(name: HTMLInputElement, description: HTMLInputElement, url: HTMLInputElement, type: HTMLInputElement){
    let newEx = new Exercise(name.value, description.value, url.value, type.value)
    console.log(newEx)
    this.exService.postExercise(newEx).subscribe(data=>{
      console.log(data)
    })
  }

  public putEx(name: HTMLInputElement, description: HTMLInputElement, url: HTMLInputElement, type: HTMLInputElement){
    let newEx = new Exercise(name.value, description.value, url.value, type.value)
    this.exService.putExercise(newEx).subscribe(data=>{
      console.log(data)
    })
  }

  public deleteEx(ex_id: number){
    this.exService.deleteExercise(ex_id).subscribe(data=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.exService.getExercise(2).subscribe(data=>{
      console.log(data)
      this.dataBase = data
    })
  }

}
