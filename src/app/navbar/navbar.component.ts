import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isAuthenticated : boolean
  @Input() user : any;
  @Output() logoutNotification : EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private router : Router) {
   }

  ngOnInit() {
  }

  logout()
  {
    localStorage.clear();
    this.logoutNotification.emit(false);
  }
}
