import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ApiconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiconnectProvider {
   
   private url: string="http://localhost:8100/api";

  constructor(public http: Http) {
    console.log('Hello ApiconnectProvider Provider');
  }

  //map the response to an array or object 
getMessage(){
  return this.http.get(this.url)
  .do((res:Response)=>console.log(res))
  .map((res:Response)=>(res.json()))
  .catch(this.catchError);
 
}
private catchError(error:Response | any){
  console.log(error);
  return Observable.throw(error.json() || "Server Error.");
}

private Responseval(res: Response){
  console.log(res);
}
private extractData(res:Response){
  res.json();
}
}
// export  class  Product {

// id: number;

// FirstName: string;

// // cost: number;

// // quantity: number;

// constructor(values: Object = {}) {

// Object.assign(this, values);

// }
// }