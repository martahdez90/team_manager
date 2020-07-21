import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from "../../shared/match.service";
import { Match } from "../../models/match";

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {
  public games = [new Match(new Date(2020, 7, 15), 'Madird', 'No olvideis traer la equipacion'),
                  new Match(new Date(2020, 6, 1), 'Londres', 'Comntario para probar'),
                  new Match(new Date(2020, 6, 1), 'Londres', 'Comntario para probar'),
                  new Match(new Date(2020, 6, 1), 'Londres', 'Comntario para probar')]
  public dataBase: object
  constructor(private matchService: MatchServiceService) {}
  newGame(){
    this.games.push(new Match(new Date(), 'Lugar', 'Añade tu comentario'))
  }

  ngOnInit(): void {
    (this.matchService.getMatches(2).subscribe(data=>{
      this.dataBase = data 
    }))
  }
}

