import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from './deals';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    ComponentsModule
  ],
})
export class DealsPageModule {}
