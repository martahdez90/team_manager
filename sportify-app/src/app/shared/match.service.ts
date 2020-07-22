import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Match } from "../models/match";

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {
  private url = "http://localhost:3025/match"
  constructor(private http: HttpClient) { }


  getMatches(id){
    return this.http.get(this.url +"/" +id)
  }

  postMatch(newMatch: Match){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        team_id: 2,
      },
    };
    return this.http.post(this.url, newMatch, options)
  }

  putMatch(changes: Match){
    return this.http.put(this.url, changes)
  }

  detelMatch(id: number){
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
