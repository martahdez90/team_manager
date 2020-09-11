import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { TeamService } from 'src/app/shared/team.service';
import Swal from 'sweetalert2';
import { Tournament } from '../../../models/tournament'
import { TournamentService } from '../../../shared/tournament.service'
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-coach-tournament',
  templateUrl: './coach-tournament.component.html',
  styleUrls: ['../../../base.scss', './coach-tournament.component.scss']
})
export class CoachTournamentComponent implements OnInit {


  public teams: object
  public allTournaments: object
  public tournament: Tournament
  public tournaments: object
  public team: Team = new Team("", "")
  public team_name: string = this.loginService.team_name;
 

  constructor(private tournamentService: TournamentService, private loginService: LoginService, private teamService: TeamService) {
    this.tournament = new Tournament("", "", "", "", "", "");
  }

  

  public saveTournament(tournament_id: number) {
    console.log('torneo guardado')
    console.log(tournament_id)
    this.tournament.tournament_id = tournament_id;
  }

  saveTeam(team_id: number) {
    this.loginService.team_id = team_id
    console.log('equipo guardado')
    console.log(this.loginService.team_id);
    
  }

 

  public subscribeTournament() {
    let subscription = { team_id: this.loginService.team_id, tournament_id: this.tournament.tournament_id }
    console.log(subscription)
    this.tournamentService.subscriptionTournament(subscription).subscribe(data => {
      console.log(data)
      this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
        this.tournaments = data
      })
    })
  }

  // public getTournament(tournament: Tournament) {
  //   this.tournament = tournament
  //   console.log(this.tournament)
  // }


  // public putTournament(name: HTMLInputElement, sport:HTMLInputElement,date: HTMLInputElement, location: HTMLInputElement, category: HTMLInputElement, description:HTMLInputElement, team_id: HTMLInputElement) {
  //   console.log(this.tournament.date)
  //   let newTournament = new Tournament(name.value, sport.value, date.value, category.value, description.value, location.value)
  //   newTournament.team_id = Number(team_id.value);
  //   newTournament.tournament_id = this.tournament.tournament_id
  //   if (name.value === "") {
  //     newTournament.name = this.tournament.name
  //   } else {
  //     newTournament.name = name.value
  //   }
  //   if (sport.value === "") {
  //     newTournament.sport = this.tournament.sport
  //   } else {
  //     newTournament.sport = sport.value
  //   }
  //   if (date.value === "") {
  //     newTournament.date = this.tournament.date
  //   } else {
  //     newTournament.date = date.value
  //   }
  //   if (location.value === "") {
  //     newTournament.location = this.tournament.location
  //   } else {
  //     newTournament.location = location.value
  //   }
  //   if (category.value === "") {
  //     newTournament.category = this.tournament.category
  //   } else {
  //     newTournament.category = category.value
  //   }
  //   if (description.value === "") {
  //     newTournament.description = this.tournament.description
  //   } else {
  //     newTournament.description = description.value
  //   }
  //   console.log(newTournament)
  //   this.tournamentService.putTournament(newTournament).subscribe(data => {
  //     console.log(data)
  //     this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
  //       this.allTournaments = data
  //     })
  //   })
  // }

  // public newTournament(name: HTMLInputElement, sport:HTMLInputElement, date: HTMLInputElement, location: HTMLInputElement, category: HTMLInputElement, description: HTMLInputElement, team_id: HTMLInputElement) {

  //   let newTournament = new Tournament(name.value, sport.value,date.value, category.value, description.value, location.value)
  //   newTournament.team_id = Number(team_id.value);
  //   console.log(newTournament)

  //   this.tournamentService.postTournamnet(newTournament).subscribe(data => {
  //     console.log(data)
  //     this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
  //       this.allTournaments = data


  //     })
  //   })
  // }

  // public deleteTournament(id: number) {
  //   console.log(this.allTournaments)
  //   Swal.fire({
  //     title: '¿Estás seguro?',
  //     text: "¡No podrás recuperarlo!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#00bfa5',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'borrar'
  //   }).then((result) => {
  //     if (result.value) {
  //       console.log(id)
  //       this.tournamentService.deleteTournament(id).subscribe((data) => {
  //         console.log(data)
  //         this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
  //           this.allTournaments = data
  //           Swal.fire({
  //             title: '¡Eliminado!',
  //             text: 'Tu torneo ha sido borrado',
  //             icon: 'success',
  //             confirmButtonColor: '#00bfa5'
  //           })
  //         })
  //       })
  //     }
  //   })
  // }

 

  ngOnInit(): void {
    this.tournamentService.getTournament().subscribe(data => {
      console.log(data)
      console.log("data")
      this.allTournaments = data
    })
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data) => {
      console.log(data);
      this.teams = data;
    })
    this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
      console.log("?")
      console.log(data)
      this.tournaments = data
    })
  }
}


