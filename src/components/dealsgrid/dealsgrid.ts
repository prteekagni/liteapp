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
  @Input() items: string;
  @ViewChild(Content) content: Content;

  constructor(private dealService: DealsProvider) {
    console.log("Hello DealsgridComponent Component");
    this.text = "Hello World";
  }

  ngOnInit() {
    console.log(this.items);

    this.dealService.getStoreLinks().subscribe((res: any) => {
      this.cards = res.data;
    });
  }
}
