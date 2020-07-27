import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { ExerciseService } from 'src/app/shared/exercise-service.service';
import { Exercise } from 'src/app/models/exercise';
import { TrainingService } from 'src/app/shared/training-service.service';


@Component({
  selector: 'app-my-exercises',
  templateUrl: './my-exercises.component.html',
  styleUrls: ['./my-exercises.component.css']
})
export class MyExercisesComponent implements OnInit {

  public dataBase: object
  public putData: object
  public modals: object
  public trainings: object
  public options = [
    {name: 'Selecciona uno', value: 'null'},
    {name: 'Calentamiento', value:'warmUp'},
    {name: 'Parte principal', value:'main'},
    {name: 'Vuelta a la calma', value:'coolDown'}
  ]

  constructor(private loginService: LoginService, private exService: ExerciseService, private trainingService:TrainingService) { }

  public postEx(type: HTMLInputElement ,description: HTMLInputElement ,url: HTMLInputElement ,name: HTMLInputElement,){
    let newEx = new Exercise(name.value, description.value, url.value, type.value)
    newEx.training_id= this.loginService.training_id;
    console.log(newEx);
    
    this.exService.postExercise(newEx).subscribe(data=>{
      this.exService.getExercise(this.loginService.training_id).subscribe(data =>{
        console.log(data)
        this.dataBase = data
        this.modals = data
      })
      
    })
  }

  public putEx(type: HTMLInputElement ,description: HTMLInputElement ,url: HTMLInputElement ,name: HTMLInputElement ){
    let newEx = new Exercise(name.value, description.value, url.value, type.value)
    console.log(newEx);
    
    this.exService.putExercise(newEx).subscribe(data=>{
      console.log(data)
    })
  }

  deleteEx(ex_id: number){
    console.log(ex_id)
    this.exService.deleteExercise(ex_id).subscribe(data=>{
      this.exService.getExercise(this.loginService.training_id).subscribe(data =>{
        console.log(data)
        this.dataBase = data
        this.modals = data
      })
     

    })
  }

  public getExData(data: object){
    this.putData = data
  }

  ngOnInit(): void {
    this.exService.getExercise(this.loginService.training_id).subscribe(data =>{
      console.log(data)
      this.dataBase = data
      this.modals = data
    })
    this.trainingService.getTraining(this.loginService.training_id).subscribe((data)=>
    {
      this.trainings= data;
    })
  }

}
