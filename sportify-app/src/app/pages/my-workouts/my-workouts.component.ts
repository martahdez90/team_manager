import { Component, OnInit } from '@angular/core';
import { Training } from "../../models/training";
import { LoginService } from 'src/app/shared/login.service';
import { TrainingService } from 'src/app/shared/training-service.service';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {

  public edit: Training;
  public dataBase: object;
  public teams: object;
  
                  
  constructor(private loginService: LoginService, private trainingService: TrainingService, private teamService: TeamService) {
    this.edit = new Training("", "", "", "")
   }

  public getTraining(train: Training){
    this.edit = train
    console.log(this.edit)
  }

  public saveTraining(id:Training)
  {
    console.log(id)
    this.loginService.training_id= id.training_id;
  }

  public getTrainings()
  {
    this.trainingService.getTrainings().subscribe((data)=>
    {
      this.dataBase=data;
    });
  };

  // getTraining(id:number)
  // {
  //   this.loginService.team_id= id;
  //   this.trainingService.getTraining(id).subscribe((data)=>
  //   {
  //     this.dataBase=data;
  //   });
  // };

  public addTraining(name:HTMLInputElement, date:HTMLInputElement, location:HTMLInputElement, description:HTMLInputElement, team_id:HTMLInputElement)
  {
    console.log(team_id.value)
    let newTraining=new Training(name.value,date.value,location.value,description.value);
    newTraining.team_id= Number(team_id.value);
    console.log(newTraining);
      this.trainingService.postTraining(newTraining).subscribe((data)=>
      {
        this.trainingService.getTraining(this.loginService.userLoged.user_id).subscribe((data)=>
        {;
          console.log(data);
          this.dataBase= data
        })
        
      });
  };

  public putTraining(name:HTMLInputElement, date:HTMLInputElement, location:HTMLInputElement, description:HTMLInputElement, team_id:HTMLInputElement)
  {
    let newTraining = new Training(name.value, date.value, location.value, description.value)
    newTraining.training_id = this.edit.training_id
    this.trainingService.putTraining(newTraining).subscribe((data)=>
    {
      console.log(data);
      this.trainingService.getTraining(this.loginService.userLoged.user_id).subscribe((data)=>
      {
        console.log(data);
        this.dataBase=data;
      });
    });
  };

  public deleteTraining(id:number)
  {
    this.trainingService.deleteTraining(id).subscribe((data)=>
    {
      console.log(data)
      this.trainingService.getTraining(this.loginService.userLoged.user_id).subscribe((data)=>
      {
        console.log(data);
        this.dataBase=data;
      });
    });
  };

  ngOnInit(): void {
    this.trainingService.getTraining(this.loginService.userLoged.user_id).subscribe((data)=>
    {
      console.log(data);
      this.dataBase=data;
    });

    this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data)=>
    {
      this.teams=data;
    })
    
  }

}
