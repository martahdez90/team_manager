import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'sportify';
  public isMenuOpen = true;
  public contentMargin = 240;
  public coach = false;
  public player = true;

  userChange() {
    this.coach = true;
    this.player = false;
    console.log(this.coach)
  }

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 0;
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
