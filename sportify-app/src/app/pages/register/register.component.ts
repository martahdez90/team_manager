import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from '../../shared/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/* enum Rol {
  coach = "coach",
  player = "player"
} */
  
export class RegisterComponent implements OnInit {
  public user = new User;

  public rols: String[] = ["entrenador", "jugador"]
  constructor(private apiService: UserService) { 
    this.user
  }

  // (rol: Rol, password: string, name: string, lastName: string, email: string, phone: number) 

  onSubmit(form) {
    console.log(form.value);
    this.apiService.postUser(this.user).subscribe((data) => {
      console.log(data); 
    })
  }

  ngOnInit(): void {
  }

}
