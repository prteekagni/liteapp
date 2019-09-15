import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Events, NavController } from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "cardslide",
  templateUrl: "cardslide.html"
})
export class CardslideComponent implements OnInit {
  cards: any = [];
  @Input() items;
  @Input() type;
  storelinks;

  constructor(
    private event: Events,
    private navCtrl: NavController,
    private dealService: DealsProvider,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (this.type == "store") {
      this.dealService.getStores(this.items).subscribe((res: any) => {
        this.cards = res;
      });
    } else if (this.type == "deals") {
      this.dealService.getDealSubCategory().subscribe((res: any) => {
        this.cards = res;
      });
    }
  }

  goToDeal(item) {
    console.log(item);
    this.navCtrl.push("ProductlistPage", {
      cat: item.Category
    });
  }
}
