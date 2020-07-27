import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3025/users";
  public user: User;
  constructor(private http: HttpClient) { }
  getUser(id: number) {
    return this.http.get(this.url + "/" + id)
  }
  /* getUsers() {
    return this.http.get(this.url)
  } */
  postUser(newUser: User) {
    return this.http.post(this.url + "/register", newUser)
  }
  putUser(newUser: User) {
    return this.http.put(this.url, newUser)
  }
  deleteUser(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), 
      body: {
        id: id,
      }
    }
    return this.http.delete(this.url, options)
  }
  getPlayer(id: number)
  {
   return this.http.get(this.url + "/teamPlayers" +"/" + id)
  }

  // postPlayers(newPlayers:User)
  // {
  //   return this.http.post(this.url + "/teamPlayers" + newPlayers)
  // }
  deletePlayer(id:number)
  {
    let options =
    {
      headers:new HttpHeaders ({
        "Content-Type":"application/json"
      }),
      body:{user_id:id}
    }
    return this.http.delete(this.url +"/teamPlayers", options)
  }
}