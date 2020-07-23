import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-trainings-player',
  templateUrl: './trainings-player.component.html',
  styleUrls: ['./trainings-player.component.css']
})
export class TrainingsPlayerComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
