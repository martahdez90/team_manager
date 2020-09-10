import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  
  
  
export class LoginComponent implements OnInit {
  public rememberme: any = { checked: false }
  public emailsaved = ''
  public inputs = document.querySelectorAll(".input")

    
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  logIn(email: string, password: string) {
    let form = {
      email: email,
      password: password,
    }

    this.loginService.login(form).subscribe(data => {
      if(data[0]===undefined){
        Swal.fire({
          title: 'UPS...',
      text: "email o contraseña incorrecto ",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#00bfa5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
      
        })
      }
      this.loginService.userLoged = data[0]
      //console.log(this.loginService.userLoged);
      //recordar usuario
      if (this.rememberme.checked == true) {
        localStorage.setItem('email', form.email);
      } else {
        //eliminar usuario del localstorage
        localStorage.removeItem('email');
      }

      //Redirigir a jugador o entrenador
      switch (this.loginService.userLoged.rol) {
        case 'player':
          this.router.navigate(['/player/myMatches']);
          break;
        case 'coach':
          this.router.navigate(['/coach/myTeams'])
          break;
        default:
          alert("inicio de sesión incorrecto")
          break;
      }
    })
  }

  ngOnInit(): void {
    //rellenar email con el guardado en local
    this.emailsaved = localStorage.getItem('email')

  }
}