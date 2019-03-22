import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import {RegisterUserProvider} from  "../../providers/register-user/register-user";


/**
 * Generated class for the UpdateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage {
  gradv;
  @ViewChild('grad') grad;
  @ViewChild('firstname') firstname;
  @ViewChild('fathername') fathername;
  @ViewChild('mothername') mothername;
  @ViewChild('lastname') lastname;
  @ViewChild('gap') gap;
  @ViewChild('branch') branch;
  @ViewChild('dob') dob;
  @ViewChild('cay') cay;
  @ViewChild('gender') gender;
  @ViewChild('year') year;
  @ViewChild('admcat') admcat;
  @ViewChild('caste') caste;
  credentials:any;
  value;
  
  constructor(public forgotCtrl: AlertController,private userReg:RegisterUserProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.value=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateprofilePage');
  }
  clickAdd(){
    this.credentials={
      Year:this.year.value,
      Branch:this.branch.value,
      FirstName:this.firstname.value,
      FatherName:this.fathername.value,
      MotherName:this.mothername.value,
      LastName:this.lastname.value,
      Date_of_Birth:this.dob.value,
      Gender:this.gender.value,
      College_Admission_Year:this.cay.value,
      Admission_Category:this.admcat.value,
      Caste:this.caste.value,
      Gap:this.gap.value,
      Select_your_Current_Graduation:this.grad.value,
      sid:this.value,
    };
     this.userReg.updatePersonalDetails(this.credentials).subscribe( 
      response=>{
        let alert = this.forgotCtrl.create({
            title: 'Successfully updated',
            
            buttons: ['OK']
          });
          alert.present();
          
      },
      error=>{
        console.log('error',error)
        alert('User record was not created')
      });

    
  }
}
