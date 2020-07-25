import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

import { TrainingService } from 'src/app/shared/training-service.service';
import { Training } from 'src/app/models/training';



@Component({
  selector: 'app-trainings-player',
  templateUrl: './trainings-player.component.html',
  styleUrls: ['./trainings-player.component.css']
})
export class TrainingsPlayerComponent implements OnInit {
  public training: Training;;
   public dataBase: object;


  constructor(private loginService: LoginService,  private trainingService:TrainingService)
   { }


   getTrainings()
   {
     this.trainingService.getTrainings().subscribe((data)=>
     {
       this.dataBase=data;
     });
   };
 
   getTraining(id:number)
   {
     this.trainingService.getTraining(id).subscribe((data)=>
     {
       this.dataBase=data;
     });
   };
 
  addTraining(newTraining:Training)
   {
       this.trainingService.postTraining(newTraining).subscribe((data)=>
       {
         console.log(data);
       });
   };
 
   UpdateTraining(newTraining:Training)
   {
     this.trainingService.putTraining(newTraining).subscribe((data)=>
     {
       console.log(data);
     });
   };
 
   deleteTraining(id:number)
   {
     this.trainingService.deleteTraining(id).subscribe((data)=>
     {
       console.log(data);
     });
   };
 

   


  ngOnInit(): void {
    this.trainingService.getTraining(this.loginService.team_id).subscribe(data => {
      this.dataBase = data
      console.log(this.dataBase)
    })
  }
  }

