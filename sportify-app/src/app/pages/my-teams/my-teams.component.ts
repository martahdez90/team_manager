import { Component, OnInit } from '@angular/core';
import { Team } from "../../models/team"
import { TeamService } from 'src/app/shared/team.service';
@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  public dataBase: object;
  public team:Team;
  public teams = [new Team('Distrito Olimpico', 'Senior'),
                new Team('Alcobendas', 'Cadete'),
                new Team('Cabanillas', 'Junior')]
  constructor(private teamService:TeamService ) { }
  
  newTeam(name: HTMLInputElement, category: HTMLInputElement){
    this.teams.push(new Team(name.value, category.value))
  }
  getTeams(id:number)
  {
    this.teamService.getTeams(id).subscribe(data=>
      {
        this.dataBase= data;
      });
      console.log(this.dataBase);
  }
  addTeams(name:string, category:string){
    let newTeam=new Team(name, category);
   ;
    this.teamService.postTeam(newTeam).subscribe((data)=>
    {
      console.log(data);
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
    this.teamService.deleteTeam(id).subscribe((data)=>
    {
      console.log(data)
    })
  }
  ngOnInit(): void {
    this.teamService.getTeams(2).subscribe(data=>
      {
        this.dataBase= data;
      });
  }
}