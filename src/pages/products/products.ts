import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { DealsProvider } from "../../providers/deals/deals";

@IonicPage()
@Component({
  selector: "page-products",
  templateUrl: "products.html"
})
export class ProductsPage {
  pCategories: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductsPage");
  }

  ionViewWillEnter() {
    this.pCategories = [
      {
        id: "1",
        name: "fashion"
      },
      {
        id: "1",
        name: "typicode"
      },
      {
        id: "2",
        name: "For you"
      },
      {
        id: "3",
        name: "Valentine Gift"
      },
      {
        id: "4",
        name: "Testing "
      }
    ];
  }

  gotoProducts(data) {
    this.sharedService.nativeSlide();
    this.navCtrl.push("ProductlistPage", {
      id: data.id,
      type: "fashion"
    });
  }
}
