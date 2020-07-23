import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  logIn(email: HTMLInputElement, password: HTMLInputElement) {
    let form = {
      email: email.value,
      password: password.value
    }
    /* this.loginService.login(form).subscribe(data => {
      this.loginService.userLoged = data[0]
      console.log(this.loginService.userLoged)
      if (this.loginService.userLoged.rol == 'player') {
        this.router.navigate(['/player/myMatches'])
        console.log("redirigiendo a jugador")
      } else if (this.loginService.userLoged.rol == 'coach') {
        console.log("redirigiendo a coach")
        this.router.navigate(['/coach/myTeams'])
      } else if (this.loginService.userLoged.rol == 'null'){
        alert("inicio de sesión incorrecto")
      }
    }) */
    this.loginService.login(form).subscribe(data => {
      this.loginService.userLoged = data[0]
      console.log(this.loginService.userLoged);
      switch (this.loginService.userLoged.rol) {
        case 'player':
          this.router.navigate(['/player/myMatches']);
          console.log("redirigiendo a jugador");
          break;
        case 'coach':
          console.log("redirigiendo a coach")
          this.router.navigate(['/coach/myTeams'])  
              break;
        default:
          alert("inicio de sesión incorrecto")
              break;
          }
      })
  }

  ngOnInit(): void {
  }

}
