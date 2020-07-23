import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.css']
})
export class MySettingsComponent implements OnInit {

  public userLoged = this.loginService.userLoged

  constructor(private loginService: LoginService, private router: Router) { }

  public logOut(){
    this.loginService.logOut().subscribe(data=>{
      this.loginService.userLoged = null
      this.router.navigate(['/login']);
      console.log("redirigiendo al login");
      })
  }

  ngOnInit(): void {

  }

}
