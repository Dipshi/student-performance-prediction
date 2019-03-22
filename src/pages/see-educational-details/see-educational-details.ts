import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ViewChild } from '@angular/core';

// import {NavController} from "ionic-angular";
/**
 * Generated class for the SeeEducationalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import {RegisterUserProvider} from  "../../providers/register-user/register-user";

@IonicPage()
@Component({
  selector: 'page-see-educational-details',
  templateUrl: 'see-educational-details.html',
})
export class SeeEducationalDetailsPage {
   weathers:any;
   uid;
   Sem1;
   tenth;
   twelve;
   diploma;
   Sem2;
   Sem3;
   Sem4;
   Sem5;
   Sem6;
   Sem7;
   Sem1_dead;
   Sem1_live;
   Sem2_dead;
   Sem2_live;
   Sem3_dead;
   Sem3_live;
   Sem4_dead;
   Sem4_live;
   Sem5_dead;
   Sem5_live;
   Sem6_dead;
   Sem6_live;
   Sem7_dead;
   Sem7_live;

   value;
  @ViewChild('ssc') ssc;
  @ViewChild('hsc') hsc;
  @ViewChild('sem1') sem1;
  @ViewChild('sem2') sem2;
  @ViewChild('sem3') sem3;
  @ViewChild('sem4') sem4;
  @ViewChild('sem5') sem5;
  @ViewChild('sem6') sem6;
  @ViewChild('sem7') sem7;
  @ViewChild('type') type;
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
  Type;
  
  currScore;
  flag=0;
  constructor(public forgotCtrl: AlertController,public userReg:RegisterUserProvider,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) { 
             this.value = navParams.get('id');
}

  ionViewDidLoad(){
    console.log('ionViewDidLoad SeeEducationalDetailsPage');
    
    // console.log(this.uid);
     this.storage.get('id').then(val=>{
        if(val!=null)
         this.uid=val
      }    
    );
    this.getDet();
  }

 getDet(){
       this.userReg.getEduDetails(this.value).subscribe((weather) => {
         
         this.weathers = weather
        //  this.Sem1=this.weathers.Sem1,
      if(this.weathers){
         this.flag=1
         this.tenth=this.weathers.tenth_score,
         this.twelve=this.weathers.twelve_score,
         this.diploma=this.weathers.Diploma_score
         if( this.twelve>0){
             this.Type="HSC";
             this.currScore=this.twelve;
         }
         else if(this.diploma>0){
           this.Type="Diploma";
           this.currScore=this.diploma;
         }
         
         this.Sem1=this.weathers.Sem1,
         this.Sem2=this.weathers.Sem2,
         this.Sem3=this.weathers.Sem3,
         this.Sem4=this.weathers.Sem4,
         this.Sem5=this.weathers.Sem5,
         this.Sem6=this.weathers.Sem6,
         this.Sem7=this.weathers.Sem7,
         this.Sem1_dead=this.weathers.Sem1_dead_kt,
         this.Sem1_live=this.weathers.Sem1_live_kt,
         this.Sem2_dead=this.weathers.Sem2_dead_kt,
         this.Sem2_live=this.weathers.Sem2_live_kt,
         this.Sem3_dead=this.weathers.Sem3_dead_kt,
         this.Sem3_live=this.weathers.Sem3_live_kt,
         this.Sem4_dead=this.weathers.Sem4_dead_kt,
         this.Sem4_live=this.weathers.Sem4_live_kt,
         this.Sem5_dead=this.weathers.Sem5_dead_kt,
         this.Sem5_live=this.weathers.Sem5_live_kt,
         this.Sem6_dead=this.weathers.Sem6_dead_kt,
         this.Sem6_live=this.weathers.Sem6_live_kt,
         this.Sem7_dead=this.weathers.Sem7_dead_kt,
         this.Sem7_live=this.weathers.Sem7_live_kt
         
        }
        else{
          alert("Add Details first")
          this.flag=0
        }
       });
 }
 clickUpdate() {
     if(this.ssc.value==this.weathers.tenth_score)
          this.ssc.value=this.weathers.tenth_score;
    if(this.Type=="HSC"){
      if(this.hsc.value==this.weathers.twelve_score)
          this.hsc.value=this.weathers.twelve_score;
          this.diploma=0
    }
    else{
     if(this.hsc.value==this.weathers.Diploma_score)
          this.hsc.value=this.weathers.Diploma_score;
          this.twelve=0;
    }
    if(this.sem1.value==this.weathers.Sem1)
          this.sem1.value=this.weathers.Sem1;
    if(this.sem2.value==this.weathers.Sem2)
          this.sem2.value=this.weathers.Sem2;
    if(this.sem3.value==this.weathers.Sem3)
          this.sem3.value=this.weathers.Sem3;
    if(this.sem4.value==this.weathers.Sem4)
          this.sem4.value=this.weathers.Sem4;
    if(this.sem5.value==this.weathers.Sem5)
          this.sem5.value=this.weathers.Sem5;
    if(this.sem6.value==this.weathers.Sem6)
          this.sem6.value=this.weathers.Sem6;
    if(this.sem7.value==this.weathers.Sem7)
          this.sem7.value=this.weathers.Sem7;
    if(this.sem1dead.value==this.weathers.Sem1_dead_kt)
          this.sem1dead.value=this.weathers.Sem1_dead_kt;
    if(this.sem1live.value==this.weathers.Sem1_live_kt)
          this.sem1live.value=this.weathers.Sem1_live_kt;
    if(this.sem2dead.value==this.weathers.Sem2_dead_kt)
          this.sem2dead.value=this.weathers.Sem2_dead_kt;
    if(this.sem2live.value==this.weathers.Sem2_live_kt)
          this.sem2live.value=this.weathers.Sem2_live_kt;
    if(this.sem3dead.value==this.weathers.Sem3_dead_kt)
          this.sem3dead.value=this.weathers.Sem3_dead_kt;
    if(this.sem3live.value==this.weathers.Sem3_live_kt)
          this.sem3live.value=this.weathers.Sem4_dead_kt;
    if(this.sem4dead.value==this.weathers.Sem4_dead_kt)
          this.sem4dead.value=this.weathers.Sem2_live_kt;
    if(this.sem4live.value==this.weathers.Sem4_live_kt)
          this.sem4live.value=this.weathers.Sem4_live_kt;
    if(this.sem5dead.value==this.weathers.Sem5_dead_kt)
          this.sem5dead.value=this.weathers.Sem5_dead_kt;
    if(this.sem5live.value==this.weathers.Sem5_live_kt)
          this.sem5live.value=this.weathers.Sem5_live_kt;
    if(this.sem6dead.value==this.weathers.Sem6_dead_kt)
          this.sem6dead.value=this.weathers.Sem6_dead_kt;
    if(this.sem6live.value==this.weathers.Sem6_live_kt)
          this.sem6live.value=this.weathers.Sem6_live_kt;
    if(this.sem7dead.value==this.weathers.Sem7_dead_kt)
          this.sem7dead.value=this.weathers.Sem7_dead_kt;
    if(this.sem7live.value==this.weathers.Sem7_live_kt)
          this.sem7live.value=this.weathers.Sem7_live_kt;
    
    
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
      sid:this.value,
      
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
      sid:this.value,
    };
  }

  

  
    this.userReg.updateEduDetails(this.credentials,this.value).subscribe( 
      response=>{
        let alert = this.forgotCtrl.create({
            title: 'Successfully updated',
            
            buttons: ['OK']
          });
          alert.present();
          
      },
      error=>{
        console.log('error',error)
        let alert = this.forgotCtrl.create({
            title: ' Updation failed',
            
            buttons: ['OK']
          });
          alert.present();
      });

           
  
  this.getDet();

}
  public async get(){
    return await this.storage.get('id');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
