import {Component} from "@angular/core";
import {NavController,NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Response,Http } from '@angular/http';
import {ApiconnectProvider} from  "../../providers/apiconnect/apiconnect";
import {RegisterUserProvider} from  "../../providers/register-user/register-user";
import { ViewChild } from '@angular/core';


@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public trip: any;
   value;
  weathers:any;
  firstname;
  fathername;
  mothername;
  lastname;
  branch;
  Dob;
  gap;
  caste;
  sem1;
  sem2;
  sem3;
  sem4;
  admiss_cat;
  gender;
  ssc;
  hsc;
  credentials;
  // @ViewChild('ssc') ssc;
  // @ViewChild('hsc') hsc;
  // @ViewChild('sem1') sem1;
  // @ViewChild('sem2') sem2;
  // @ViewChild('sem3') sem3;
  // @ViewChild('sem4') sem4;
  // @ViewChild('admiss_cat') admiss_cat;
  // @ViewChild('caste') caste;
  // @ViewChild('gap') gap;
  // @ViewChild('gender') gender;
  // @ViewChild('hsc') hsc;
  // @ViewChild('sem1') sem1;
  // @ViewChild('sem2') sem2;
  // @ViewChild('sem3') sem3;
  // @ViewChild('sem4') sem4;
  // @ViewChild('sem5') sem5;
  // @ViewChild('sem6') sem6;
  // @ViewChild('sem7') sem7;

  public requests:any=[];
  
  constructor(public nav: NavController, public tripService: TripService, public navParams: NavParams,private userReg:RegisterUserProvider,private msgService: ApiconnectProvider,public httpClient:HttpClient)
  {
    // set sample data
      this.value=navParams.get('id');
      console.log("current id is ",this.value);    // this.getDetails();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.userReg.getUserDetails(this.value).subscribe((weather) => {
      
        this.weathers = weather,
        this.firstname=this.weathers.FirstName,
        this.branch=this.weathers.Branch,
        this.mothername=this.weathers.MotherName,
        this.fathername=this.weathers.FatherName,
        this.lastname=this.weathers.LastName,
        this.Dob=this.weathers.Date_of_Birth,
        this.caste=this.weathers.Caste,
        this.admiss_cat=this.weathers.Admission_Category,
        this.gap=this.weathers.Gap,
        this.gender=this.weathers.Gender
        

    });

     this.userReg.getEduDetails(this.value).subscribe((weather) => {
      
         this.weathers = weather,
         this.ssc=this.weathers.tenth_score,
         this.hsc=this.weathers.twelve_score,
         this.sem1=this.weathers.Sem1,
         this.sem2=this.weathers.Sem2,
         this.sem3=this.weathers.Sem3,
         this.sem4=this.weathers.Sem4
      
        //  this.Sem1=thi

    });
  
  
  } 
  detailsstore()
  { 
    this.credentials={
      gap:this.gap.value
    }
    console.log(gap);

  }
  
}
