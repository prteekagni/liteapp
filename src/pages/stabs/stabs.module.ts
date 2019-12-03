import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StabsPage } from './stabs';

@NgModule({
  declarations: [
    StabsPage,
  ],
  imports: [
    IonicPageModule.forChild(StabsPage),
  ],
})
export class StabsPageModule {}
