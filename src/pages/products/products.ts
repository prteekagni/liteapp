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
  noproducts: boolean = true;
  services;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider
  ) {
    // this.DealsProvider.getStores(this.items.ID).subscribe((res: any) => {
    //   this.cards = res;
    // });
    this.dealsService.getStoreCategory().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
    this.dealsService.getProductCategory().subscribe((res: any) => {
      this.services = res;
    });
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    // this.dealsService.getProductCategory().subscribe((res: any) => {
    //   this.products = res;
    // });
    // this.dealsService.getProductCategory().subscribe((res: any) => {
    //   this.services = res;
    // });
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
