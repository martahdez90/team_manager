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
  public team1:Team

  constructor(private teamService:TeamService, private loginService: LoginService )
   {
     this.team1=new Team("","");
   
  }
  getTeam(team1:Team)
  {
    this.team1=team1
    console.log(team1);
  }
  
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

 
  UpdateTeam(name:HTMLInputElement, category:HTMLInputElement)
  {
    console.log(this.team1)
    let newTeam = new Team(name.value, category.value)
    newTeam.team_id=this.team1.team_id;

    if(name.value===""){newTeam.name = this.team1.name}

    if (category.value ===""){newTeam.category= this.team1.category}



    console.log(newTeam)
   
    this.teamService.putTeam(newTeam).subscribe((data)=>
    {
      this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe(data=>
        {
          this.dataBase= data;
        });
      
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
  saveTeam(id: number){
    this.loginService.team_id = id
    console.log(this.loginService.team_id);
  }
  ngOnInit(): void {
    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe(data=>
      {
        this.dataBase= data;
      });
  }
}