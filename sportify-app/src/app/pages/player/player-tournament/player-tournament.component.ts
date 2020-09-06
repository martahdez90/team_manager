import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../shared/login.service';
import {Tournament} from '../../../models/tournament'
import{TournamentService} from '../../../shared/tournament.service'

@Component({
  selector: 'app-player-tournament',
  templateUrl: './player-tournament.component.html',
  styleUrls: ['../../../base.scss', './player-tournament.component.scss']
})
export class PlayerTournamentComponent implements OnInit {

  public Tournament:Tournament;
  public dataBase: object;
  public sinRegistro = true;


  constructor(private loginService: LoginService,  private tournamentService:TournamentService){ }
 
  ngOnInit(): void {
    this.tournamentService.getPlayerTournament(this.loginService.userLoged.user_id).subscribe(data => {
      this.dataBase = data
      console.log(this.dataBase)
      if (data[0].lenght != 0) {
        this.sinRegistro = false;
      }
    })
  }
  }



