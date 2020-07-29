import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from "../models/training";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private url = "http://localhost:3025/training";
  public Trainings: Training[];
  
  constructor(private http: HttpClient) { }
// para player
  getTraining(user_id: number) {
    return this.http.get(this.url + "/players/" + user_id)
  }
// para Coach
  getTeamTraining(team_id:number)
  {
     return this.http.get(this.url +"/coach"+ "/" + team_id)
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
        training_id: id,
      }
    }
    return this.http.delete(this.url, options)
  
  }
}
