import { Component } from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";

@Component({
  selector: "singleadd",
  templateUrl: "singleadd.html"
})
export class SingleaddComponent {
  text: string;
  slide:any = [];
  singleLength: number = 5;
  show:number = 2;
  constructor( private dealService: DealsProvider) {
    this.dealService.getAdsData().subscribe((res: any) => this.slide);
  }
}
