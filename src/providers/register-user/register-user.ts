import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
/*
  Generated class for the RegisterUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterUserProvider {
private url: string="http://localhost:8000";
private httpOptions: any;
 
  // the actual JWT token
  public token: string;
 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];
 

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
private updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
  loginUser(userData):Observable<any>{
    console.log(userData);
    //  const body={FirstName:userData.FirstName,Email:userData.Email,Password:userData.Password};
     return this.http.post(this.url+'/userLogin/',userData);
    // this.http.post(this.url+'/api-token-auth/', JSON.stringify(userData), this.httpOptions).subscribe(
    //   data => {
    //     this.updateData(data['token']);
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

  // public logout(uid):Observable<any>{
  //   this.http.post('/api-token-refresh/',uid);
  // }
}
