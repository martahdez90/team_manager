import { Component, OnInit } from '@angular/core';
// import { link } from 'fs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public fondo: string;
  //public links: NodeListOf<Element>;
  
  constructor() { }

  //ejemplo de como cambiar una clase
  ngOnInit(): void {
    //this.links = document.querySelectorAll('.linkedin');
    // this.changeCLass()
  }

  // changeCLass() {
  //   let links = document.querySelectorAll('.linkedin');
  //   links.forEach(elem => {
  //     elem.classList.remove('linkedin')
  //     elem.classList.add('yay')
  //   })
  // }
}
