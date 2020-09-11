import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

import { TrainingService } from 'src/app/shared/training-service.service';
import { Training } from 'src/app/models/training';



@Component({
  selector: 'app-trainings-player',
  templateUrl: './trainings-player.component.html',
  styleUrls: ['../../../base.scss', './trainings-player.component.scss']
})
export class TrainingsPlayerComponent implements OnInit {
  public training: Training;
  public dataBase: object;
  public sinRegistro = true;


  constructor(private loginService: LoginService,  private trainingService:TrainingService){ }
 
  ngOnInit(): void {
    this.trainingService.getTraining(this.loginService.userLoged.user_id).subscribe(data => {
      this.dataBase = data
      console.log(this.dataBase)
      if (data[0].lenght != 0) {
        this.sinRegistro = false;
      }
    })
  }
  }

