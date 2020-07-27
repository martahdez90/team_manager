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
    getPlayers(id:number)
    {
      this.UserService.getPlayer(id).subscribe((data)=>
      {
        this.dataBase= data;
      })
    }
    deletePlayers(index:number)
    {
      console.log(index)
      this.UserService.deletePlayer(index).subscribe((data)=>
      {
       
        this.UserService.getPlayer(2).subscribe((data)=>
      {
      
        this.dataBase= data;
      })
  

        console.log(this.players)
      })
    }
  ngOnInit(): void {
    this.UserService.getPlayer(2).subscribe((data)=>
      {
        
        this.dataBase= data;
      })
  }
}