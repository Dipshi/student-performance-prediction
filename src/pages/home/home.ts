import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {TripDetailPage} from "../trip-detail/trip-detail";
import {SeeEducationalDetailsPage} from "../see-educational-details/see-educational-details";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";
import {UpdateprofilePage} from "../updateprofile/updateprofile";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }
  //go to profile page 
  goToProfilepage()
    {
      this.nav.push(ProfilePage);
    }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  goToUpdateprofile()
  {
    this.nav.push(UpdateprofilePage);
  }
  goTo(){
      this.nav.push(TripDetailPage);
  }
  see(){
      this.nav.push(SearchLocationPage);
  }
  seeEducation(){
      this.nav.push(SeeEducationalDetailsPage);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
  
}

//
