import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user-service.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/shared/login.service';
@Component({
  selector: 'app-my-players',
  templateUrl: './my-players.component.html',
  styleUrls: ['./my-players.component.css']
})
export class MyPlayersComponent implements OnInit {
    public dataBase:object;
    public user:User;
    public players: object[];
  constructor(private UserService: UserService, private loginService: LoginService) {}
    public getPlayers(id:number)
    {
      this.UserService.getPlayer(id).subscribe((data)=>
      {
        this.dataBase= data;
      })
    }

    public deletePlayers(index:number)
    {
      console.log(index)
      this.UserService.deletePlayer(index).subscribe((data)=>
      {
        this.UserService.getPlayer(this.loginService.team_id).subscribe((data)=>
        {
          this.dataBase= data;
        })
      })
    }

    public addPlayer(email: HTMLInputElement, phone: HTMLInputElement){
      console.log(this.loginService.team_id)
      let playerData = {
        email: email.value,
        phone: phone.value,
        team_id: this.loginService.team_id
      }
      this.UserService.postNewPlayer(playerData).subscribe((data)=>{
        console.log(data)
        this.UserService.getPlayer(this.loginService.team_id).subscribe((data)=>
        {
          this.dataBase = data;
        })
      })
    }
  ngOnInit(): void {
    this.UserService.getPlayer(this.loginService.team_id).subscribe((data)=>
      {
        this.dataBase = data;
      })
  }
}