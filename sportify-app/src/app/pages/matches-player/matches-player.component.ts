import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { MatchServiceService } from "../../shared/match.service";


@Component({
  selector: 'app-matches-player',
  templateUrl: './matches-player.component.html',
  styleUrls: ['./matches-player.component.css']
})
export class MatchesPlayerComponent implements OnInit {
  public id = this.loginService.userLoged.user_id
  public dataBase: object
    
  constructor(private loginService: LoginService, private matchService: MatchServiceService,) { }

  ngOnInit(): void {
    this.matchService.getMatches(this.id).subscribe(data => {
      this.dataBase = data
      console.log(this.dataBase)
    })
  }

}

