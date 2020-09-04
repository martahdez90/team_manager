import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from "../../../shared/match.service";
import { Match } from "../../../models/match";
import { LoginService } from 'src/app/shared/login.service';
import { TeamService } from 'src/app/shared/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['../../../base.scss', './my-games.component.scss']
})
export class MyGamesComponent implements OnInit {
 
  public teams: object
  public dataBase: object
  public game: Match
  public team_name: string = this.loginService.team_name;

  constructor(private matchService: MatchServiceService, private loginService: LoginService, private teamService: TeamService) {
    this.game = new Match("", "", "", "");
  }

  public getGame(game: Match) {
    this.game = game
    console.log(this.game)
  }

  public putGame(date: HTMLInputElement, location: HTMLInputElement, comments: HTMLInputElement, rival: HTMLInputElement) {
    console.log(this.game)
    let newMatch = new Match(date.value, comments.value, rival.value, location.value)
    newMatch.match_id = this.game.match_id
    console.log(newMatch)
    
    if (date.value === "") {
      newMatch.date = this.game.date;
    }
    if (rival.value === "") {
      newMatch.rival = this.game.rival;
    }
    if (location.value === "") {
      newMatch.location = this.game.location;
    }
    if (comments.value === "") {
      newMatch.comments = this.game.comments;
    }
    this.matchService.putMatch(newMatch).subscribe(data => {
      this.matchService.getMatches(this.loginService.team_id).subscribe(data => {
        this.dataBase = data
      })
    })
  }

  public newGame(date: HTMLInputElement, comments: HTMLInputElement, rival: HTMLInputElement,  location: HTMLInputElement) {

    let newMatch = new Match(date.value, comments.value, rival.value, location.value)
    newMatch.team_id = this.loginService.team_id;
    console.log(newMatch)

    this.matchService.postMatch(newMatch).subscribe(data => {
      console.log(data)
      this.matchService.getMatches(this.loginService.team_id).subscribe(data => {
        this.dataBase = data

      })
    })
  }

  public deleteGame(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00bfa5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log(id)
        this.matchService.detelMatch(id).subscribe((data) => {
          console.log(data)
          this.matchService.getMatches(this.loginService.team_id).subscribe(data => {
            this.dataBase = data
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu partido ha sido borrado',
              icon: 'success',
              confirmButtonColor: '#00bfa5'
            })
          })
        })
      }
    })
  }

  ngOnInit(): void {
    this.matchService.getMatches(this.loginService.team_id).subscribe(data => {
      this.dataBase = data
      console.log(data)
    })
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data) => {
      console.log('Eqipos')
      console.log(data);
      this.teams = data;
    })
  }
}

