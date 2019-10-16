import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProductlistPage } from "./productlist";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ProductlistPage],
  imports: [IonicPageModule.forChild(ProductlistPage), ComponentsModule]
})
export class ProductlistPageModule {}
