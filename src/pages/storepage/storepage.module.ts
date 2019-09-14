import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StorepagePage } from "./storepage";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [StorepagePage],
  imports: [IonicPageModule.forChild(StorepagePage), ComponentsModule]
})
export class StorepagePageModule {}
