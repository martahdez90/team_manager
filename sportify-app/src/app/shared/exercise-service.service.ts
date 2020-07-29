import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exercise  } from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url = "http://localhost:3025/exercise";
  
  public Exercises: Exercise[];


  constructor(private http: HttpClient) { }

  getExercise(training_id: number) {
    return this.http.get(this.url + "/" + training_id)
  }
  getExercises() {
    return this.http.get(this.url)
  }
  postExercise(newExercise: Exercise) {
    return this.http.post(this.url, newExercise)
  }
  putExercise(newExercise: Exercise) {
    return this.http.put(this.url, newExercise)
  }
  deleteExercise(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), 
      body: {
        exercise_id: id,
      }
    }
    return this.http.delete(this.url, options)
  
  }
}
