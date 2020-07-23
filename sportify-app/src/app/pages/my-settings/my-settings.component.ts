import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.css']
})
export class MySettingsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
