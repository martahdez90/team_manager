import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from "../../shared/match.service";
import { Match } from "../../models/match";
import { LoginService } from 'src/app/shared/login.service';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  public teams:object
  public dataBase: object
  public game: Match
  constructor(private matchService: MatchServiceService, private loginService: LoginService, private teamService:TeamService) 
  {
    this.game= new Match("","","","");
  }

  getGame(game:Match){
    this.game = game
    console.log(this.game)
  }

  putGame(date: HTMLInputElement, location: HTMLInputElement, comments: HTMLInputElement, rival:HTMLInputElement, team_id:HTMLInputElement)
  {
    console.log(this.game)
    let newMatch = new Match(date.value, comments.value, rival.value,location.value)
    newMatch.team_id= Number(team_id.value);
    newMatch.match_id = this.game.match_id
    console.log(newMatch)

    this.matchService.putMatch(newMatch).subscribe(data =>{
      this.matchService.getMatches(1).subscribe(data=>{
        this.dataBase = data
  
      })
    })
  }
  

  newGame(date: HTMLInputElement, location: HTMLInputElement, comments: HTMLInputElement, rival:HTMLInputElement, team_id:HTMLInputElement)
  {
    
    let newMatch = new Match(date.value, comments.value, rival.value,location.value)
    newMatch.team_id= Number(team_id.value);
    console.log(newMatch)

    this.matchService.postMatch(newMatch).subscribe(data =>{
      this.matchService.getMatches(1).subscribe(data=>{
        this.dataBase = data
  
      })
    })
  }

  deleteGame(id:number)
  {
    console.log(id)
    this.matchService.detelMatch(id).subscribe((data)=>
    {
      console.log(data)
      this.matchService.getMatches(1).subscribe(data=>{
        this.dataBase = data
      })
    })
  }

  ngOnInit(): void {
    this.matchService.getMatches(1).subscribe(data=>{
      this.dataBase = data

    })
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data)=>
    {
      console.log(data);
      this.teams= data;
    })
  }
}

