import {Component} from "@angular/core";
import {NavController, NavParams,AlertController, ToastController, MenuController} from "ionic-angular";
import {Storage} from '@ionic/storage';

// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  

  constructor(private storage: Storage,public toastCtrl: ToastController,public forgotCtrl: AlertController, public menu: MenuController, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

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
  // }
  clickUpdate(){
    
            let alert = this.forgotCtrl.create({
            title: 'Successfully updated',
            
            buttons: ['OK']
          });
          alert.present();
          }
 }

