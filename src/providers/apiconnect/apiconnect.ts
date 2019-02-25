import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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

getMessage(){
  return this.http.get(this.url)
  .do(res=>console.log(res));
 
}
}
