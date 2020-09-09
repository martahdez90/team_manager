import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { ExerciseService } from 'src/app/shared/exercise-service.service';
import { Exercise } from 'src/app/models/exercise';
import { TrainingService } from 'src/app/shared/training-service.service';
import Swal from 'sweetalert2';
//video de youtube

import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-my-exercises',
  templateUrl: './my-exercises.component.html',
  styleUrls: ['../../../base.scss', './my-exercises.component.scss']
})
export class MyExercisesComponent implements OnInit {

  public dataBase: object
  public exercise: Exercise
  public options = [
    { name: 'Selecciona uno', value: 'null' },
    { name: 'Calentamiento', value: 'calentamiento' },
    { name: 'Parte principal', value: 'principal' },
    { name: 'Vuelta a la calma', value: 'estiramientos' }
  ]

  constructor(private loginService: LoginService, private exService: ExerciseService, private trainingService: TrainingService, private sanitizer: DomSanitizer
    ) {
    this.exercise = new Exercise("", "", "", "")
  }

  //generar url video youtube para incrustarlo
  public getVideoIframe(url) {
    let video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

  public getExData(exercise: Exercise) {
    this.exercise = exercise
    console.log(this.exercise)
  }

  public postEx(type: HTMLInputElement, description: HTMLInputElement, url: HTMLInputElement, name: HTMLInputElement,) {
    let newEx = new Exercise(name.value, description.value, url.value, type.value)
    newEx.training_id = this.loginService.training_id;

    this.exService.postExercise(newEx).subscribe(data => {
      console.log(data)
      this.exService.getExercise(this.loginService.training_id).subscribe(data => {
        console.log(data)
        this.dataBase = data
      })
    })
  }

  public putEx(type: HTMLInputElement, description: HTMLInputElement, url: HTMLInputElement, name: HTMLInputElement) {

    let newEx = new Exercise(name.value, description.value, url.value, type.value)

    newEx.exercise_id= this.exercise.exercise_id;
    console.log(type.value)

    if (name.value === "") {
      newEx.name = this.exercise.name
    };
    if (description.value === "") {
      newEx.description = this.exercise.description
    };
    if (url.value === "") {
      newEx.url = this.exercise.url
    };

    if( type.value === null){
      newEx.type = this.exercise.type
    };
    console.log('newEx=');
    console.log(newEx);
    
    this.exService.putExercise(newEx).subscribe(data=>{
      console.log("datos del put")
      console.log(data)
      this.exService.getExercise(this.loginService.training_id).subscribe(data => {
        console.log(data)
        this.dataBase = data
      })
    })
  }

  public deleteEx(ex_id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00bfa5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        console.log(ex_id)
        this.exService.deleteExercise(ex_id).subscribe(data => {
          this.exService.getExercise(this.loginService.training_id).subscribe(data => {
            console.log(data)
            this.dataBase = data
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu ejercicio ha sido eliminado',
              icon: 'success',
              confirmButtonColor: '#00bfa5'
            })
          })
        })
      }
    })
  }

  ngOnInit(): void {
    this.exService.getExercise(this.loginService.training_id).subscribe(data => {
      console.log(data)
      this.dataBase = data
    })
  }
}
