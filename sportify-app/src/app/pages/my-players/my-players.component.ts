import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user-service.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-my-players',
  templateUrl: './my-players.component.html',
  styleUrls: ['./my-players.component.css']
})
export class MyPlayersComponent implements OnInit {
dataBase:object;
user:User;
  constructor(private UserService: UserService)
   {
    }
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