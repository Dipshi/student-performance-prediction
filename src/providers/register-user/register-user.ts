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

private updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
  loginUser(userData){
    //  const body={FirstName:userData.FirstName,Email:userData.Email,Password:userData.Password};
     return this.http.post(this.url+'/userLogin/',userData).map(res => res.json());
    // this.http.post(this.url+'/api-token-auth/', JSON.stringify(userData), this.httpOptions).do(
    //   data => {
    //     // this.updateData(data['token']);
    //   },
    //   err => {
    //     this.errors = err['error'];
    //   }
    // );
 
}

 public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
  //See prediction
  seeprediction(userdata)
  {
     return this.http.put(this.url+'/prediction/',userdata).map(res=> res.json());
  }

  public logout(uid):Observable<any>{
    console.log("Id is",uid);
    return this.http.delete(this.url+'/userLogout/'+{uid}+'/');
  }
}

