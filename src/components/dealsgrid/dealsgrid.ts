import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";
import { Content } from "ionic-angular";

/**
 * Generated class for the DealsgridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "dealsgrid",
  templateUrl: "dealsgrid.html"
})
export class DealsgridComponent implements OnInit {
  text: string;
  cards: any = [];
  @Input() items: any;
  copyItem: any;
  @ViewChild(Content) content: Content;

  constructor(private dealService: DealsProvider) {}

  ngOnInit() {
    this.copyItem = this.items;
    console.log(this.copyItem);
    this.dealService.getDealSubCategory(this.items.ID).subscribe((res: any) => {
      this.cards = res;
      // console.log(this.cards.length);
    });
  }
}
