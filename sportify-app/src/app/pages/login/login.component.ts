import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  logIn(email: HTMLInputElement, password: HTMLInputElement){
    let form = {
      email: email.value,
      password: password.value
    }
    this.loginService.login(form).subscribe(data =>{
      this.loginService.userLoged = data[0]
    })
  }

  ngOnInit(): void {
  }

}
