import { Component, OnInit } from '@angular/core';
import { Training } from "../../../models/training";
import { LoginService } from 'src/app/shared/login.service';
import { TrainingService } from 'src/app/shared/training-service.service';
import { TeamService } from 'src/app/shared/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['../../../base.scss', './my-workouts.component.scss']
})

export class MyWorkoutsComponent implements OnInit {

  public edit: Training;
  public dataBase: object;
  public teams: object;
  public team_name: string = this.loginService.team_name;
  

  constructor(private loginService: LoginService, private trainingService: TrainingService, private teamService: TeamService) {
    this.edit = new Training("", "", "", "")
  }

  public getTraining(train: Training) {
    this.edit = train
    console.log(this.edit)
  }

  public saveTraining(training_id: number) {
    console.log('entranmiento guardado')
    console.log(training_id)
    this.loginService.training_id = training_id;
  }

  public addTraining(name: HTMLInputElement, date: HTMLInputElement, location: HTMLInputElement, description: HTMLInputElement,) {
    let newTraining = new Training(name.value, date.value, location.value, description.value);
    newTraining.team_id = this.loginService.team_id;
    console.log(newTraining);
    this.trainingService.postTraining(newTraining).subscribe((data) => {
      console.log(data)
      this.trainingService.getTeamTraining(this.loginService.team_id).subscribe((data) => {
        console.log(data);
        this.dataBase = data
      })

    });
  };

  public putTraining(name: HTMLInputElement, date: HTMLInputElement, location: HTMLInputElement, description: HTMLInputElement) {
    let newTraining = new Training(name.value, date.value, location.value, description.value)
    newTraining.training_id = this.edit.training_id

    if (name.value === "") {
      newTraining.name = this.edit.name;
    }
    if (date.value === "") {
      newTraining.date = this.edit.date;
    }
    if (location.value === "") {
      newTraining.location = this.edit.location;
    }
    if (description.value === "") {
      newTraining.description = this.edit.description;
    }
    this.trainingService.putTraining(newTraining).subscribe((data) => {

      console.log(data);
      this.trainingService.getTeamTraining(this.loginService.team_id).subscribe((data) => {
        console.log(data);
        this.dataBase = data;
      });
    });
  };

  public deleteTraining(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00bfa5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log(id)
        this.trainingService.deleteTraining(id).subscribe((data) => {
          console.log(data)
          this.trainingService.getTeamTraining(this.loginService.team_id).subscribe((data) => {
            console.log(data);
            this.dataBase = data;
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu entrenamiento ha sido borrado',
              icon: 'success',
              confirmButtonColor: '#00bfa5'
            })
          });
        });
      };
    })
  }

  ngOnInit(): void {
    this.trainingService.getTeamTraining(this.loginService.team_id).subscribe((data) => {
      console.log(data);
      this.dataBase = data;
    });

    // this.teamService.getTeams(this.loginService.userLoged.user_id).subscribe((data)=>
    // {
    //   this.teams=data;
    // })

  }

}
