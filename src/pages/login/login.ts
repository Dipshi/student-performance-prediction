import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ViewChild } from '@angular/core';
import {RegisterUserProvider} from  "../../providers/register-user/register-user";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage  {
  @ViewChild('username') uname;
  @ViewChild('password') password;
  credentials;
  public requests:any=[];
  weathers: any;

  constructor(public storage:Storage,public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private regUser: RegisterUserProvider) {
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
    
    // this.nav.setRoot(HomePage);
    // if(!this.uname.value || !this.password.value ){
    this.regUser.loginUser(this.credentials).subscribe((weather) => {
         this.weathers = weather,
         this.nav.setRoot(HomePage),
         this.storage.set('id',this.weathers.id),
         this.storage.set('username',this.weathers.username),
         this.storage.set('token',this.weathers.token),
         
        //  console.log('logged in user ',this.weathers.id)
         this.storage.get('username').then((val)=>
             console.log('logged in user name',val)),
         this.storage.get('id').then((val1)=>
             console.log('logged in user id',val1))
    });
        //  console.log("This value",this.weathers.id)
    // }
    // else{
    //   alert("Type in credentials");
    // }
  }
  
 
  getSessionData(){
    return this.requests;
  }
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
