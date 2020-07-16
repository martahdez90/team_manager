import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../shared/title.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public isMenuOpen = true;
  public contentMargin = 240;
  public title =  this.titleService.title;

  constructor(public titleService: TitleService) { }
  
  newTitle() {
    this.titleService.title = "mis amigos"
  }

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  ngOnInit(): void {
  }

}
