import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { IUserRegister } from '../shared/interfaces'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm: FormGroup

  private user : IUserRegister =
  {
    "user" : { username : '',
              email : '',
              password : ''}
  }
  private errors : Array<string>

  constructor(private registerUser : UserService, private fb : FormBuilder, private route : Router) {
    this.authForm = this.fb.group({
      'username' : ['', Validators.required],
      'email' : ['', Validators.required],
      'password' : ['', Validators.required ]
    });
   }

  ngOnInit() {
    this.errors = [];
  }

  signUp()
  {
    this.user.user = this.authForm.value;
    this.errors = [];
    console.log(this.user);
    this.registerUser.signup(this.user).subscribe(
      x => 
      { localStorage.setItem('jWtToken',x.user.token); 
        this.route.navigateByUrl('/');
    }, 
    err => { 
      for(var i = 0; i < err.error.errors.email.length; i++)
      {
        err.error.errors.email[i] = 'email ' + err.error.errors.email[i];
      }
      for(var i = 0; i < err.error.errors.password.length; i++)
      {
        err.error.errors.password[i] = 'password ' + err.error.errors.password[i];
      }
      for(var i = 0; i < err.error.errors.username.length; i++)
      {
        err.error.errors.username[i] = 'username ' + err.error.errors.username[i];
      }
      this.errors = this.errors.concat(err.error.errors.email);
      this.errors = this.errors.concat(err.error.errors.password);
      this.errors = this.errors.concat(err.error.errors.username);
    });
  }
}
