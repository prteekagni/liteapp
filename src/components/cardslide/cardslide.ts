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
    private navCtrl: NavController,
    private dealService: DealsProvider
  ) {}

  ngOnInit() {
    if (this.type == "stores") {
      // this.dealService.getStores(this.items).subscribe((res: any) => {
      //   this.cards = res;
      // });
    } else if (this.type == "deals") {
      this.dealService
        .getSubStores(this.items.CatPID, this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    }
  }

  goToDeal(item) {
    if (this.type == "stores") {
      alert("dlfkjgfg");
    } else if (this.type == "deals") {
      this.navCtrl.push("ProductlistPage", {
        cat: item.Category
      });
    }
  }
}
