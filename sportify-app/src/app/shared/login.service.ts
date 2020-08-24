import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3025/users/login"
  public userLoged: User;
  public team_id: number;
  public team_name: string;
  public training_id: number;

  constructor(private http: HttpClient) { }

  login(data: object){
    return this.http.post(this.url, data)
    
  }

  logOut(){
    let data = [
      {email: '', password: ''}
    ]
    return this.http.post(this.url, data)
  }

}
