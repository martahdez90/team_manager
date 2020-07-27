import { Component, OnInit } from '@angular/core';
import { Team } from "../../models/team"
import { TeamService } from 'src/app/shared/team.service';
import { LoginService } from 'src/app/shared/login.service';
@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  public dataBase: object;

  constructor(private teamService:TeamService, private loginService: LoginService ) { }
  
  
  addTeams(name:HTMLInputElement, category:HTMLInputElement){
    let newTeam=new Team(name.value, category.value);
    newTeam.user_id=this.loginService.userLoged.user_id;

   this.teamService.postTeam(newTeam).subscribe((data)=>
    {
      console.log(data)
      this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data)=>
      {
         console.log(data)
        this.dataBase = data
      })
    });
  };
  UpdateTeam(changes:Team)
  {
    this.teamService.putTeam(changes).subscribe((data)=>
    {
      console.log(data)
    })
  }
  deleteTeam(id:number)
  {
   
    console.log(id)
    this.teamService.deleteTeam(id).subscribe((data)=>
    {
      console.log(data);
      this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data)=>
      {
        console.log(data);
           this.dataBase= data;
      })
     
    })
  }
  ngOnInit(): void {
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe(data=>
      {
        this.dataBase= data;
      });
  }
}