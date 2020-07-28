import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Team } from "../models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = "http://localhost:3025/teams"

  constructor(private http: HttpClient) { }

  getTeams(id: number){
    return this.http.get(this.url + "/" + id)
  }
  postTeam(newTeam: Team){
    return this.http.post(this.url, newTeam)
  }
  putTeam(changes: Team){
    return this.http.put(this.url, changes)
  }
  deleteTeam(id: number){
    console.log(id)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        team_id: id,
      },
    };
    return this.http.delete(this.url, options)
  }
}
