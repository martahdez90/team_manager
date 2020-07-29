import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from '../../shared/user-service.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public user = new User;
  public rols: String[] = ["entrenador", "jugador"]
  public registrado = false;

  constructor(private apiService: UserService) {
    this.user
  }

  onSubmit(form) {
    console.log(form.value);
    this.apiService.postUser(this.user).subscribe((data) => {
      console.log(data);
      if(data[0].email === this.user.email){
        alert(data)
      }
    })
    this.registrado = true;
  }

  ngOnInit(): void {

  }
  
}
