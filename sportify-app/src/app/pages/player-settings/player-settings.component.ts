import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/shared/user-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.css']
})
export class PlayerSettingsComponent implements OnInit {
  public userLoged = this.loginService.userLoged

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  public putUser(name: HTMLInputElement, lastName: HTMLInputElement, email: HTMLInputElement, phone: HTMLInputElement){
    let userData = new User()
      userData.user_id = this.userLoged.user_id
      userData.rol = this.userLoged.rol
      userData.password = this.userLoged.password
    if(name.value === ""){
      userData.name = this.userLoged.name
    }else{
      userData.name = name.value
    }
    if(lastName.value === ""){
      userData.lastName = this.userLoged.lastName
    }else{
      userData.lastName = lastName.value
    }
    if(email.value === ""){
      userData.email = this.userLoged.email
    }else{
      userData.email = email.value
    }
    if(phone.value === ""){
      userData.phone = this.userLoged.phone
    }else{
      userData.phone = Number(phone.value)
    }
    console.log(userData)
    this.userService.putUser(userData).subscribe(data=>{
      console.log(data)
      this.userLoged = userData
    })
  }
  
  
  public logOut(){
    this.loginService.logOut().subscribe(data=>{
      console.log(data)
      this.loginService.userLoged = null
      this.router.navigate(['/login']);
      console.log("redirigiendo al login");
      })
  }

  public deleteUser(){
    this.userService.deleteUser(this.loginService.userLoged.user_id).subscribe(data=>{
      console.log(data)
      this.loginService.userLoged = null
      this.router.navigate(['/login']);
      console.log("redirigiendo al login");
    })
  }

  ngOnInit(): void {

  }

}
