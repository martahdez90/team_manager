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
 dataBase:Object;
  public games = [new Training('Entreno de 2' ,new Date(2020, 7, 15), 'Madird', 'Comntario de prueba'),
                  new Training('Entreno de prueba 4' ,new Date(2020, 6, 1), 'Londres', 'Comntario para probar'),
                  new Training('Entreno de prueba 6' ,new Date(2020, 6, 1), 'Londres', 'Comntario para probar')]
                  
  constructor(private loginService: LoginService, private trainingService: TrainingService) { }

  newWorkout(){
    console.log(this.loginService.userLoged.user_id)
    this.games.push(new Training('Entreno de prueba' ,new Date(2050, 6, 1), 'Hawai', 'Comntario para probar'))
  }

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
    
  }

}
