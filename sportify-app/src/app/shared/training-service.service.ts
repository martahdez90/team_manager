import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from "../models/training";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private url = "http://localhost:3000/trainings";
  public Training: Training;
  constructor(private http: HttpClient) { }

  getTraining(id: number) {
    return this.http.get(this.url + "/" + id)
  }
  getTrainings() {
    return this.http.get(this.url)
  }
  postTraining(newTraining: Training) {
    return this.http.post(this.url, newTraining)
  }
  putTraining(newTraining: Training) {
    return this.http.put(this.url, newTraining)
  }
  deleteTraining(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), 
      body: {
        id: id,
      }
    }
    return this.http.delete(this.url, options)
  
  }
}
