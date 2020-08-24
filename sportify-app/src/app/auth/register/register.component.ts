import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from '../../shared/user-service.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public user = new User;
  public rols: String[] = ["entrenador", "jugador"]
    

  constructor(private apiService: UserService, private router: Router) {
    this.user
  }

  onSubmit(form) {
    console.log(form.value);
    this.apiService.postUser(this.user).subscribe((data:any) => {
      console.log(data);
      if (data.alerta === "1" ) {
        Swal.fire({
          title: '¡Enhorabuena!',
          text: 'Tu cuenta ha sido creada',
          icon: 'success',
          confirmButtonColor: '#00bfa5'
        })
        this.router.navigate(['/login']);
      } else if (data[0].email === this.user.email) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este email ya existe',
          footer: 'Regístrese con otro email'
        })
        // this.refresh()
      } 
    })
  }

  // refresh() {
  //   window.location.reload();
  // }

  ngOnInit(): void {

  }
  
}
