import {Component} from "@angular/core";
import {NavController, NavParams,AlertController, ToastController, MenuController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { ViewChild } from '@angular/core';
import {RegisterUserProvider} from  "../../providers/register-user/register-user";
// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  
  @ViewChild('ssc') ssc;
  @ViewChild('gap') gap;
  @ViewChild('type') type;
  @ViewChild('hsc') hsc;
  @ViewChild('sem1') sem1;
  @ViewChild('sem2') sem2;
  @ViewChild('sem3') sem3;
  @ViewChild('sem4') sem4;
  @ViewChild('sem5') sem5;
  @ViewChild('sem6') sem6;
  @ViewChild('sem7') sem7;
  @ViewChild('sem1dead') sem1dead;
  @ViewChild('sem1live') sem1live;
  @ViewChild('sem2live') sem2live;
  @ViewChild('sem2dead') sem2dead;
  @ViewChild('sem3live') sem3live;
  @ViewChild('sem3dead') sem3dead;
  @ViewChild('sem4live') sem4live;
  @ViewChild('sem4dead') sem4dead;
  @ViewChild('sem5live') sem5live;
  @ViewChild('sem5dead') sem5dead;
  @ViewChild('sem6live') sem6live;
  @ViewChild('sem6dead') sem6dead;
  @ViewChild('sem7live') sem7live;
  @ViewChild('sem7dead') sem7dead;
  credentials;
  uid;
  constructor(public userReg:RegisterUserProvider,private storage: Storage,public toastCtrl: ToastController,public forgotCtrl: AlertController, public menu: MenuController, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
    this.storage.get('id').then(val => {
        if (val != null) {
          this.uid = val;
        }
      });
  }
clickUpdate() {
  if(this.type.value=="Diploma"){
     this.credentials={
      tenth_score:this.ssc.value,
      twelve_score:0,
      Diploma_score:this.hsc.value,
      Sem1:this.sem1.value,
      Sem1_dead_kt:this.sem1dead.value,
      Sem1_live_kt:this.sem1live.value,
      Sem2:this.sem2.value,
      Sem2_dead_kt:this.sem2dead.value,
      Sem2_live_kt:this.sem2live.value,
      Sem3:this.sem3.value,
      Sem3_dead_kt:this.sem3dead.value,
      Sem3_live_kt:this.sem3live.value,
      Sem4:this.sem4.value,
      Sem4_dead_kt:this.sem4dead.value,
      Sem4_live_kt:this.sem4live.value,
      Sem5:this.sem5.value,
      Sem5_dead_kt:this.sem5dead.value,
      Sem5_live_kt:this.sem5live.value,
      Sem6:this.sem6.value,
      Sem6_dead_kt:this.sem6dead.value,
      Sem6_live_kt:this.sem6live.value,
      Sem7:this.sem7.value,
      Sem7_dead_kt:this.sem7dead.value,
      Sem7_live_kt:this.sem7live.value,
      sid:this.uid,
      
    };
}
  else{
     this.credentials={
      tenth_score:this.ssc.value,
      twelve_score:this.hsc.value,
      Diploma_score:0,
      Sem1:this.sem1.value,
      Sem1_dead_kt:this.sem1dead.value,
      Sem1_live_kt:this.sem1live.value,
      Sem2:this.sem2.value,
      Sem2_dead_kt:this.sem2dead.value,
      Sem2_live_kt:this.sem2live.value,
      Sem3:this.sem3.value,
      Sem3_dead_kt:this.sem3dead.value,
      Sem3_live_kt:this.sem3live.value,
      Sem4:this.sem4.value,
      Sem4_dead_kt:this.sem4dead.value,
      Sem4_live_kt:this.sem4live.value,
      Sem5:this.sem5.value,
      Sem5_dead_kt:this.sem5dead.value,
      Sem5_live_kt:this.sem5live.value,
      Sem6:this.sem6.value,
      Sem6_dead_kt:this.sem6dead.value,
      Sem6_live_kt:this.sem6live.value,
      Sem7:this.sem7.value,
      Sem7_dead_kt:this.sem7dead.value,
      Sem7_live_kt:this.sem7live.value,
      sid:this.uid,
    };
  }

  
    this.userReg.updateDetails(this.credentials).subscribe( 
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

           // search by item
  // searchBy(item) {
  //   if (this.fromto === 'from') {
  //     this.storage.set('pickup', item.name);
  //   }

  //   if (this.fromto === 'to') {
  //     this.storage.set('dropOff', item.name);
  //   }
  //   // this.nav.push(SearchCarsPage);
  //   this.nav.pop();

}
}