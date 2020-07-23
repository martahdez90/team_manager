import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-my-coach',
  templateUrl: './my-coach.component.html',
  styleUrls: ['./my-coach.component.css']
})
export class MyCoachComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
