import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import {ProfilePage} from "../pages/profile/profile";
import {UpdateprofilePage} from "../pages/updateprofile/updateprofile";
import {TeacherDashboardPage} from "../pages/teacher-dashboard/teacher-dashboard";
import {RegisterUserProvider} from  "../providers/register-user/register-user";
import { Storage } from '@ionic/storage';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
   username;
  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private userReg:RegisterUserProvider,
    private storage:Storage,
   
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Teacher Dashboard', component: TeacherDashboardPage, icon: 'person'},
      {title: 'Log Out', component: LoginPage, icon: 'person'}
    ];
     this.storage.get('username').then((val) => {
      if (val != null) {
        this.username = val;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
      
    });
   

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
    showteacher_dashboard(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(TeacherDashboardPage);
  }

  // logout() {
  //   this.userReg.logout(uid).subscribe(
  //     response=>{
  //       alert("Successfully logged out!!!")
  //       this.nav.setRoot(LoginPage);
  //     },
  //     error=>{
  //       console.log('error',error)
  //       alert("Something went wrong!!")
  //     }

  //   );
    
  // }

}
