import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorepagePage } from './storepage';

@NgModule({
  declarations: [
    StorepagePage,
  ],
  imports: [
    IonicPageModule.forChild(StorepagePage),
  ],
})
export class StorepagePageModule {}
