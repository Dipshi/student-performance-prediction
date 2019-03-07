import {Component,OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { ViewChild } from '@angular/core';
import {RegisterUserProvider} from  "../../providers/register-user/register-user";
// import {ApiconnectProvider} from  "../../providers/apiconnect/apiconnect";



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage   {
  
  @ViewChild('fullName') fname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  credentials;
  constructor(public nav: NavController,public regUser:  RegisterUserProvider) {
  }
  
  // register and go to login page
  register() {
    this.credentials={
      username:this.fname.value,
      email:this.email.value,
      password:this.password.value,
    };
   
    console.log(this.credentials);
    this.regUser.registerUser(this.credentials).subscribe(
      response=>{
        alert('User '+this.fname.value+' has been created')
        this.nav.setRoot(LoginPage);
      },
      error=>{
        console.log('error',error)
        alert('User '+this.fname.value+' was not created')
      }
   
    );

    
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
