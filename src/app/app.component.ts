import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../app/services/authentication.service'
import { UserService } from '../app/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'conduit-blog';
  isAuthenticated : boolean;
  userproperty : any
  constructor(private auth : AuthenticationService, private user : UserService )
  {
    
  }

  ngOnInit()
  {
    if(localStorage.getItem('jWtToken') != null)
    {
      this.auth.authenticate(localStorage.getItem('jWtToken'))
      .subscribe(
        () => 
        {
          this.isAuthenticated = true;
          this.user.currentUser(localStorage.getItem('jWtToken')).subscribe(x => this.userproperty = x)
        },
        () => this.isAuthenticated = false)
    }
    else
    {
      this.isAuthenticated = false;
    }
  }

  onLogoutNotification()
  {
    this.isAuthenticated = false;
  }


  onLogin()
  {
    if(localStorage.getItem('jWtToken') != null)
    {
      this.auth.authenticate(localStorage.getItem('jWtToken')).subscribe(
        resp => {
          this.isAuthenticated = true;
          this.user.currentUser(localStorage.getItem('jWtToken')).subscribe(x => this.userproperty = x)
        }
      )
      
    }
  }
}
