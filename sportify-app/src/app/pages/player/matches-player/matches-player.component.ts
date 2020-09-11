import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { MatchServiceService } from "../../../shared/match.service";


@Component({
  selector: 'app-matches-player',
  templateUrl: './matches-player.component.html',
  styleUrls: ['../../../base.scss', './matches-player.component.scss']
})
export class MatchesPlayerComponent implements OnInit {

  public dataBase: object
  public sinRegistro = true;
    
  constructor(private loginService: LoginService, private matchService: MatchServiceService) { }
  

  ngOnInit(): void {
    console.log(this.loginService.userLoged.user_id)
    this.matchService.getPlayerMatches(this.loginService.userLoged.user_id).subscribe(data => {
      console.log(data)
      this.dataBase = data 
      if (data[0].lenght != 0) {
        this.sinRegistro = false;
      }
      
    })
  }

}

