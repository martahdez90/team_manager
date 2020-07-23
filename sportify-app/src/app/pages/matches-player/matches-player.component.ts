import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-matches-player',
  templateUrl: './matches-player.component.html',
  styleUrls: ['./matches-player.component.css']
})
export class MatchesPlayerComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
