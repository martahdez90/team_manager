import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { TrainingService } from "../../shared/training-service.service";

@Component({
  selector: 'app-trainings-player',
  templateUrl: './trainings-player.component.html',
  styleUrls: ['./trainings-player.component.css']
})
export class TrainingsPlayerComponent implements OnInit {

  public id = this.loginService.userLoged.user_id
  public dataBase: object

  constructor(private loginService: LoginService, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getTraining(this.id).subscribe(data => {
      this.dataBase = data
      console.log(this.dataBase)
    })
  }
  }

