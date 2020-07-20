import { Component, OnInit } from '@angular/core';
import { Team } from "../../models/team";

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  public teams = [new Team('Distrito Olimpico', 'Senior'),
                new Team('Alcobendas', 'Cadete'),
                new Team('Cabanillas', 'Junior')]

  constructor() { }

  newTeam(name: HTMLInputElement, category: HTMLInputElement){
    this.teams.push(new Team(name.value, category.value))
  }

  ngOnInit(): void {
  }

}
