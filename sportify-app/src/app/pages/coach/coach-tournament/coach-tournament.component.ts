import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { TeamService } from 'src/app/shared/team.service';
import Swal from 'sweetalert2';
import {Tournament} from '../../../models/tournament'
import{TournamentService} from '../../../shared/tournament.service'

@Component({
  selector: 'app-coach-tournament',
  templateUrl: './coach-tournament.component.html',
  styleUrls: ['./coach-tournament.component.css']
})
export class CoachTournamentComponent implements OnInit {

  public teams: object
  public dataBase: object
  public tournament: Tournament
  public team_name: string = this.loginService.team_name;

  constructor(private tournamentService:TournamentService, private loginService: LoginService, private teamService: TeamService) {
    this.tournament = new Tournament("", "", "", "","");
  }

  getTournament(tournament: Tournament) {
    this.tournament = tournament
    console.log(this.tournament)
  }

  putTournament( sport:HTMLInputElement,date: HTMLInputElement, location: HTMLInputElement, category: HTMLInputElement, description:HTMLInputElement, team_id: HTMLInputElement) {
    console.log(this.tournament)
    let newTournament = new Tournament(sport.value,date.value, category.value, description.value, location.value)
    newTournament.team_id = Number(team_id.value);
    newTournament.tournament_id = this.tournament.tournament_id
    console.log(newTournament)

    this.tournamentService.putTournament(newTournament).subscribe(data => {
      this.tournamentService.getTournament(this.loginService.team_id).subscribe(data => {
        this.dataBase = data
      })
    })
  }

  newTournament( sport:HTMLInputElement, date: HTMLInputElement, location: HTMLInputElement, category: HTMLInputElement, description: HTMLInputElement, team_id: HTMLInputElement) {

    let newTournament = new Tournament(sport.value,date.value, category.value, description.value, location.value)
    newTournament.team_id = Number(team_id.value);
    console.log(newTournament)

    this.tournamentService.postTournamnet(newTournament).subscribe(data => {
      console.log(data)
      this.tournamentService.getTournament(this.loginService.team_id).subscribe(data => {
        this.dataBase = data

      })
    })
  }

  deleteTournament(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00bfa5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'borrar'
    }).then((result) => {
      if (result.value) {
        console.log(id)
        this.tournamentService.deleteTournament(id).subscribe((data) => {
          console.log(data)
          this.tournamentService.getTournament(this.loginService.team_id).subscribe(data => {
            this.dataBase = data
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu torneo ha sido borrado',
              icon: 'success',
              confirmButtonColor: '#00bfa5'
            })
          })
        })
      }
    })
  }

  ngOnInit(): void {
    this.tournamentService.getTournament(this.loginService.team_id).subscribe(data => {
      this.dataBase = data
    })
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data) => {
      console.log(data);
      this.teams = data;
    })
  }
}


