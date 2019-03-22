import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import {RegisterUserProvider} from  "../../providers/register-user/register-user";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  value;
  weathers:any;
  firstname;
  fathername;
  mothername;
  lastname;
  branch;
  Dob;
  gap;
  constructor(public modalController: ModalController,private userReg:RegisterUserProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.value=navParams.get('id');
    console.log("current id is ",this.value);
  }
 
  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
    this.userReg.getUserDetails(this.value).subscribe((weather) => {
      
         this.weathers = weather,
         this.firstname=this.weathers.FirstName,
         this.branch=this.weathers.Branch,
         this.mothername=this.weathers.MotherName,
         this.fathername=this.weathers.FatherName,
         this.lastname=this.weathers.LastName,
         this.Dob=this.weathers.Date_of_Birth
      
        //  this.Sem1=thi

    });
  }
 goBack() {
    this.navCtrl.pop();
  }
}
