import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from "../../shared/match.service";
import { Match } from "../../models/match";
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  public dataBase: object
  constructor(private matchService: MatchServiceService, private loginService: LoginService) {}

  newGame(date: HTMLInputElement, location: HTMLInputElement, comments: HTMLInputElement){
    console.log(comments.value)
    let newMatch = new Match(null,date.value, location.value ,comments.value)
    console.log(newMatch)

    this.matchService.postMatch(newMatch).subscribe(data =>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    (this.matchService.getMatches(2).subscribe(data=>{
      this.dataBase = data 
    }))
  }
}

