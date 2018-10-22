import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { UserService } from '../services/user.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm: FormGroup
  errors : Array<string>
  private user =
  {
    "user" : { email : '',
              password : ''}
  }
  constructor(private fb : FormBuilder,private registerUser : UserService, private route : Router ) {
    this.authForm = this.fb.group({
      'email' : ['', Validators.required],
      'password' : ['', Validators.required ]
    });
   }

  ngOnInit() {
  }

  signIn()
  {
    this.errors = []
    this.user.user = this.authForm.value;
    
    this.registerUser.signin(this.user)
    .subscribe(
      x => 
      { localStorage.setItem('jWtToken',x.user.token);
        this.route.navigateByUrl('/');
      },
      err => { 
        for(var i = 0; i < err.error.errors["email or password"].length; i++)
        {
          err.error.errors["email or password"][i] = 'email or password ' + err.error.errors["email or password"][i];
        }

        this.errors = this.errors.concat(err.error.errors["email or password"]);
      });
  }

}
