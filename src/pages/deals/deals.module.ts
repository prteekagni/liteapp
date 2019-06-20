import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from './deals';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DealsPage,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    ComponentsModule
  ],
})
export class DealsPageModule {}
