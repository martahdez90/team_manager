import { Component, OnInit } from '@angular/core';
import { Training } from "../../models/training";
import { LoginService } from 'src/app/shared/login.service';
import { TrainingService } from 'src/app/shared/training-service.service';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {

 public training :Training;
  public dataBase:object;
  
                  
  constructor(private loginService: LoginService, private trainingService: TrainingService) { }

 

  getTrainings()
  {
    this.trainingService.getTrainings().subscribe((data)=>
    {
      this.dataBase=data;
    });
  };

  getTraining(id:number)
  {
    this.loginService.team_id= id;
    this.trainingService.getTraining(id).subscribe((data)=>
    {
      this.dataBase=data;
    });
  };

 addTraining(name:HTMLInputElement, date:HTMLInputElement, location:HTMLInputElement, description:HTMLInputElement)
  {
      this.trainingService.postTraining(new Training(name.value,date.value,location.value,description.value)).subscribe((data)=>
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
    this.trainingService.getTraining(1).subscribe((data)=>
    {
      console.log(data);
      this.dataBase=data;
    });
    
  }

}
