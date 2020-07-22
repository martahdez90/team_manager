import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from '../../shared/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User;
  public submitted = false;

  constructor(private apiService: UserService) { 
    this.user
  }

  login(form) {
    console.log(form.value);
    this.apiService.postUser(this.user).subscribe((data) => {
      console.log(data); 
    })
    this.submitted = true;
  }

  ngOnInit(): void {
  }

}
