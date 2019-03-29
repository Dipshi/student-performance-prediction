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
  tok:any;

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
         this.getSessionData(this.weathers),

        //  this.tok=this.weathers.token,
         this.nav.setRoot(HomePage)
    });
  }
  
 
  async getSessionData(to){

      this.tok=to;
      // console.log("The token value at login page",this.tok);
       
      this.storage.set('id',this.tok.id);
      this.storage.set('username',this.tok.username);
      this.storage.set('token','jgjfbg');
      this.storage.get('username').then((val)=>
          console.log('logged in user name',val));
      this.storage.get('id').then((val1)=>
             console.log('logged in user id',val1));
     
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
