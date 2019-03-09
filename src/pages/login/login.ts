import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ViewChild } from '@angular/core';
import {RegisterUserProvider} from  "../../providers/register-user/register-user";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage  {
  @ViewChild('username') uname;
  @ViewChild('password') password;
  credentials;
  public requests:any=[];

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private regUser: RegisterUserProvider) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.credentials={
      username:this.uname.value,
      password:this.password.value,
    };
    this.regUser.loginUser(this.credentials).subscribe(
      response=>{
         data =>(this.requests=(data))
         console.log(this.requests)
        this.nav.setRoot(HomePage);
      },
      error=>{
        console.log('error',error)
        alert('Type in correct credentials')
      }
   
    );
    // this.nav.setRoot(HomePage);
  }
  
  // refreshToken() {
  //   this.regUser.refreshToken();
  // }
 
  // logout() {
  //   this._userService.logout();
  // }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was send successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
