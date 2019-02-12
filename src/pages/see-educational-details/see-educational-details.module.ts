import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeEducationalDetailsPage } from './see-educational-details';

@NgModule({
  declarations: [
    SeeEducationalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeEducationalDetailsPage),
  ],
})
export class SeeEducationalDetailsPageModule {}
