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

   public requests:any=[];
  @ViewChild('barCanvas') barCanvas;
    
    barChart: any;

  constructor(public nav: NavController, public tripService: TripService, public navParams: NavParams,private userReg:RegisterUserProvider,private msgService: ApiconnectProvider,public httpClient:HttpClient) {
    // set sample data
      this.value=navParams.get('id');
      console.log("current id is ",this.value);    // this.getDetails();
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
        this.Dob=this.weathers.Date_of_Birth,
        this.caste=this.weathers.caste,
        this.admiss_cat=this.weathers.Admission_Category,
        this.gap=this.weathers.gap,
        this.gender=this.weathers.gender,
        //  this.Sem1=thi

    });

     this.userReg.getEduDetails(this.value).subscribe((weather) => {
      
         this.weathers = weather,
         this.tenth_score=this.weathers.tenth_score,
         this.twelve_score=this.weathers.twelve_score,
         this.Sem1=this.weathers.Sem1,
         this.Sem2=this.weathers.Sem2,
         this.Sem3=this.weathers.Sem3,
         this.Sem4=this.weathers.Sem4,
      
        //  this.Sem1=thi

    });
  

  } 
       
  
}
