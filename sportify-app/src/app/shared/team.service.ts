import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Team } from "../models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = "http://localhost:3025/teams"

  constructor(private http: HttpClient) { }

  getTeams(){
    return this.http.get(this.url)
  }
  postTeam(newTeam: Team){
    return this.http.post(this.url, newTeam)
  }
  putTeam(changes: Team){
    return this.http.post(this.url, changes)
  }
  deleteTeam(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete(this.url, options)
  }
}
