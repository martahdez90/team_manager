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
  constructor(private UserService: UserService, private loginService: LoginService) {}
    getPlayers(id:number)
    {
      this.UserService.getPlayer(id).subscribe((data)=>
      {
        this.dataBase= data;
      })
    }
    deletePlayers(id:number)
    {
      console.log(id)
      this.UserService.deletePlayer(id).subscribe((data)=>
      {
        console.log(data)
      })
    }
  ngOnInit(): void {
    this.UserService.getPlayer(2).subscribe((data)=>
      {
        this.dataBase= data;
      })
  }
}