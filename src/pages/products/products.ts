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
  products: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider
  ) {}

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.dealsService.getProductCategory().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
  }

  gotoProducts(data) {
    this.sharedService.nativeSlide();
    this.navCtrl.push("ProductlistPage", {
      id: data.id,
      type: "fashion"
    });
  }
}
