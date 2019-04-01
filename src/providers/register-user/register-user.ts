import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class RegisterUserProvider {
private url: string="http://localhost:8000";
private httpOptions: any;
key;
// userdata1 = new BehaviorSubject<userdata[]>([]);
  // the actual JWT token
 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];
  public userdata;
 

  constructor(public http: Http) {
    console.log('Hello RegisterUserProvider Provider');
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  seeprediction(userdata)
  {
    // console.log(userdata);
     return this.http.post(this.url+'/prediction/',userdata).map(res=> res.json());
  }

  seedseprediction(userdata)
  {
    // console.log(userdata);
     return this.http.post(this.url+'/dsePrediction/',userdata).map(res=> res.json());
  }

  registerUser(userData):Observable<any>{
    //  const body={username:userData.username,email:userData.email,password:userData.password};
     return this.http.post(this.url+'/userRegister/',userData);
 
}

updateDetails(userData):Observable<any>{
    return this.http.post(this.url+'/userDetails/',userData);
 }
   
//function to update education details   
updateEduDetails(userData,pk):Observable<any>{
     this.key=pk;
     console.log(userData)
    return this.http.put(this.url+'/userEduDetails/'+this.key+'/',userData).map(res => res.json());
}
//function to get education details
getEduDetails(pk):Observable<any>{
  // this.userdata={token:token1};
  // console.log(param);
  this.key=pk;
    return this.http.get(this.url+'/userEduDetails/'+this.key+'/').map(res => res.json());
}

//function to get user details
getUserDetails(pk):Observable<any>{
  this.key=pk;
    return this.http.get(this.url+'/userPersonalDetails/'+this.key+'/').map(res => res.json());

}
//This function adds personal details
updatePersonalDetails(userData):Observable<any>{
    return this.http.post(this.url+'/personalDetails/',userData).map(res => res.json());;
 }


  loginUser(userData){
    //  const body={FirstName:userData.FirstName,Email:userData.Email,Password:userData.Password};
     return this.http.post(this.url+'/userLogin/',userData).map(res => res.json());
 
}


  //See prediction
  // seeprediction(userdata)
  // {
  //   // console.log(userdata);
  //    return this.http.post(this.url+'/prediction/',userdata).map(res=> res.json());
  // }
  sem2prediction(userdata)
  {
        return this.http.post(this.url+'/sem2/',userdata).map(res=> res.json());

  }
  sem3prediction(userdata)
  {
        return this.http.post(this.url+'/prediction/',userdata).map(res=> res.json());


  }
  sem4prediction(userdata)
  {
        return this.http.post(this.url+'/prediction/',userdata).map(res=> res.json());

  }
  seepredictiondsesem3(userdata)
  {
    // console.log(userdata);
     return this.http.post(this.url+'/predictiondse/',userdata).map(res=> res.json());
  }
  seepredictiondsesem4(userdata)
  {
    // console.log(userdata);
     return this.http.post(this.url+'/predictiondse/',userdata).map(res=> res.json());
  }
  seepredictiondsesem5(userdata)
  {
    // console.log(userdata);
     return this.http.post(this.url+'/predictiondse/',userdata).map(res=> res.json());
  }
  public logout(uid):Observable<any>{
    console.log("Id is",uid);
    return this.http.delete(this.url+'/userLogout/'+{uid}+'/');
  }
}

