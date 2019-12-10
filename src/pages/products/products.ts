import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
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
  isConnected: boolean = true;
  servicesads: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider,
    private events: Events,
    private ngZone: NgZone
  ) {
    this.getAllServices();
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
     this.events.subscribe("nstatus", res => {
       if (res) {
         console.log("Home PAge:" + res);
         this.ngZone.run(() => {
           this.isConnected = true;
         });
       } else {
         console.log("From Home Page " + res);
         this.ngZone.run(() => {
           this.isConnected = false;
         });
       }
     });
    // this.dealsService.getProductCategory().subscribe((res: any) => {
    //   this.products = res;
    // });
    // this.dealsService.getProductCategory().subscribe((res: any) => {
    //   this.services = res;
    // });
  }

  getAllServices() {
    this.dealsService.getProductCategory().subscribe((res: any) => {
      this.services = res;
      this.noproducts = true;
      for (let index = 0; index <= this.services.length && 3; index++) {
        this.tempproducts.push(this.services[index]);
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

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete;
    }, 2000);
  }
}
