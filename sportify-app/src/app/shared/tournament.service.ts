import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import{Tournament} from "../models/tournament"


@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private url = "http://localhost:3025/tournament"
  constructor(private http: HttpClient) { }


  getTournament(){
    return this.http.get(this.url)
  }

  getPlayerTournament(user_id: number){
    return this.http.get(this.url +"/player/" + user_id)
  }

  postTournamnet(newTournament: Tournament){
    return this.http.post(this.url, newTournament)
  }

  putTournament(changes: Tournament){
    return this.http.put(this.url, changes)
  }

  subscriptionTournament(data: object){
    return this.http.post(this.url, data)
  }

  deleteTournament(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
       tournament_id: id,
      },
    };
    return this.http.delete(this.url, options)
  }
}

