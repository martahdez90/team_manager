import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-menu',
  templateUrl: './coach-menu.component.html',
  styleUrls: ['./coach-menu.component.scss']
})
export class CoachMenuComponent implements OnInit {
  title = 'sportify';
  isMenuOpen = true;
  contentMargin = 240;


  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  // sidenavEvents(str) {
  //   console.log(str);
  // }


  constructor() { }

  ngOnInit(): void {
  }

}
