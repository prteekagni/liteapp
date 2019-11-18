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
  noproducts: boolean = false;
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
    // this.dealsService.getStoreCategory().subscribe((res: any) => {
    //   this.products = res;
    //   console.log(this.products);
    //   this.noproducts = true;
    // });
    this.dealsService.getProductCategory().subscribe((res: any) => {
      this.services = res;
      console.log(res);
      this.noproducts = true;
      for (let index = 0; index <= this.services.length && 3; index++) {
        console.log(index);
        this.tempproducts.push(this.services[index]);
      }
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
    this.dealsService.storesdata.subscribe((res: any) => {
      console.log(res);
    });
    if (this.tempproducts.length != this.services.length) {
      for (let index = 0; index < this.services.length - 3; index++) {
        this.products.push(this.tempproducts[index + 3]);
      }
    }
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  goToServices(data) {
    console.log(data);
    if (data.ID) {
      this.navCtrl.push("ProductlistPage", {
        id: data,
        type: "deals"
      });
    }
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete;
    }, 2000);
  }
}
