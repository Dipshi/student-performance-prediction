import {Component} from "@angular/core";
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Response,Http } from '@angular/http';
import {ApiconnectProvider} from  "../../providers/apiconnect/apiconnect";
import {RegisterUserProvider} from  "../../providers/register-user/register-user";
import {SeeEducationalDetailsPage} from "../see-educational-details/see-educational-details";
import { ViewChild } from '@angular/core';



@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  remarks:any=[];
  public trip: any;
   value;
   val;
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
  data;
  flag=0;
  index;
  sem;
  dip;
  twe;
  @ViewChild('Ssc') Ssc;
  @ViewChild('Hsc') Hsc;
  @ViewChild('Sem1') Sem1;
  @ViewChild('Sem2') Sem2;
  @ViewChild('Sem3') Sem3;
  @ViewChild('Sem4') Sem4;
  @ViewChild('Admiss_cat') Admiss_cat;
  @ViewChild('Caste') Caste;
  @ViewChild('Gap') Gap;
  @ViewChild('Gender') Gender;
  @ViewChild('sem') semester;
  test;
  public requests:any=[];
  
  constructor(public forgotCtrl: AlertController,public nav: NavController, public tripService: TripService, public navParams: NavParams,private userReg:RegisterUserProvider,private msgService: ApiconnectProvider,public httpClient:HttpClient)
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
         this.sem4=this.weathers.Sem4,
         this.dip=this.weathers.Diploma_score,
         this.twe=this.weathers.twelve_score
    });
  
  
  } 
  
  
  detailsstore()
  {
    // this.detailsstore();
    // console.log(this.credentials);
    
    this.sem=this.semester.value;
   if(this.dip==0){
     this.credentials={
      gap:this.Gap.value,
      gender:this.Gender.value,
      caste:this.Caste.value,
      hsc:this.Hsc.value,
      ssc:this.Ssc.value,
      sem1:this.Sem1.value,
      sem2:this.Sem2.value,
      sem3:this.Sem3.value,
      sem4:this.Sem4.value,
      admiss_cat:this.Admiss_cat.value,
      semester:this.semester.value
      // this.sem=this.semester.value;

    };
   }
   else{
     this.credentials={
      gap:this.Gap.value,
      gender:this.Gender.value,
      caste:this.Caste.value,
      hsc:this.Hsc.value,
      ssc:this.Ssc.value,
      sem3:this.Sem3.value,
      sem4:this.Sem4.value,
      admiss_cat:this.Admiss_cat.value,
      semester:this.semester.value
    };

   }

  }
  seeprediction()
  {
     this.detailsstore();
      if(this.dip!=0)//for dse
      { 
        console.log(this.credentials);
         if(this.sem=='Sem 3')
        {
          this.userReg.seepredictiondsesem3(this.credentials).subscribe((app)=>{
          this.data=app.prediction;
          this.remarks=app.remarks;
          
        });
        
      }
      else if(this.sem=='Sem 4')
        {
          this.userReg.seepredictiondsesem4(this.credentials).subscribe((app)=>{
          this.data=app.prediction;
          this.remarks=app.remarks;
          
        });
        
      }
     else{
          this.userReg.seepredictiondsesem5(this.credentials).subscribe((app)=>{
          this.data=app.prediction;
          this.remarks=app.remarks;
          
        });
        
        }
          
         this.flag=1;
        // console.lo/g(this.data);
      }
      else//for Regular students
      {
        this.sem=this.semester.value;
        this.flag=1;
        //predict sem 2 marks 
        if(this.sem=='Sem 2')
        {
          this.userReg.sem2prediction(this.credentials).subscribe((app)=>
          {
            this.data=app.prediction;
            this.remarks=app.remarks;

          });
        
        }
      // predict sem3 marks
        else if(this.sem=='Sem 3')
        {
          this.userReg.sem3prediction(this.credentials).subscribe((app)=>
          {
            this.data=app.prediction;
            this.remarks=app.remarks;

          });

        }
        // predict sem4 marks
        else if(this.sem=='Sem 4')
        {
          this.userReg.sem4prediction(this.credentials).subscribe((app)=>
          {
            this.data=app.prediction;
            this.remarks=app.remarks;

          });

        }
        // predict sem5 marks 
        else
        {
          this.userReg.seeprediction(this.credentials).subscribe((app)=>
          {
            this.data=app.prediction;  
            this.remarks=app.remarks;
           
          });  

        }
          

      }

    }


  update()
    {
      this.nav.push(SeeEducationalDetailsPage,{id:this.value});

    }
}

