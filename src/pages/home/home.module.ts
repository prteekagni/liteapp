import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [HomePage],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    DirectivesModule
  ] 
})
export class HomePageModule {}
