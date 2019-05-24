import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaccountPage } from './myaccount';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyaccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaccountPage),
    ComponentsModule
    
  ],
})
export class MyaccountPageModule {}
