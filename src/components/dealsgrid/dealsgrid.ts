import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";
import { Content } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

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
  @Input() type: any;
  copyItem: any;
  @ViewChild(Content) content: Content;

  constructor(private dealService: DealsProvider, private http: HttpClient) {}

  ngOnInit() {
    this.copyItem = this.items;

    if (this.type === "deals") {
      this.dealService.getDealSubCategory().subscribe((res: any) => {
        this.cards = res;
      });
    } else {
      this.dealService.getStores(this.items).subscribe((res: any) => {
        this.cards = res;
      });
    }
  }
}
