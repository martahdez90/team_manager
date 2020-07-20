import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Match } from "../models/match";

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {
  private url = "http://localhost:3000/match"
  constructor(private http: HttpClient) { }


  getMatches(){
    return this.http.get(this.url)
  }

  postMatch(newMatch: Match){
    return this.http.post(this.url, newMatch)
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
