import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public routerLink = '/coach/myWorkouts'
  constructor(public loginService: LoginService) { }

  continue(){

  }

  ngOnInit(): void {

  }

}
