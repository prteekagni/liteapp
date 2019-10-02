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
  tempproducts: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider
  ) {}

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.dealsService.getProductCategory().subscribe((res: any) => {
      this.tempproducts = res;
      if (this.tempproducts.length >= 1) {
        for (let index = 0; index < 2; index++) {
          this.products.push(this.tempproducts[index]);
        }
      }
    });
  }

  gotoProducts(data) {
    this.sharedService.nativeSlide();
    this.navCtrl.push("ProductlistPage", {
      id: data.id,
      type: "fashion"
    });
  }
  doInfinite(event) {
    if (this.tempproducts.length != this.products.length) {
      for (
        let index = this.products.length;
        index < this.tempproducts.length;
        index++
      ) {
        this.products.push(this.tempproducts[index]);
      }
    }
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
