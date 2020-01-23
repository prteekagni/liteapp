import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { DealsProvider } from "../../providers/deals/deals";
import { map } from "rxjs/operators";
const animationsOptions = {
  animation: "ios-transition",
  duration: 1000
};
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
  ads: any = [];
  isConnected: boolean = true;
  servicesads: any = [];
  mainslide;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider,
    private events: Events,
    private ngZone: NgZone
  ) {
    this.getAllServices();
    // this.sharedService.firebaseevent("screen_view", {
    //   Name: "ProductsPage"
    // });
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
     this.dealsService
       .getAdsData()
       .pipe(map((res: any) => res.filter(resp => resp.Category.Name === 'Services')))
       .subscribe(
         (res: any) => {
           this.ads = res;
         },
         err => {
           console.log(err);
         }
       );
  }
  gotoProducts(data) {
    this.sharedService.nativeSlide();
    this.navCtrl.push("ProductlistPage", {
      id: data.id,
      type: "services"
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
  goToNotification() {
    // this.firebaseAnalytics
    //   .logEvent("gTNotification","")
    //   .then((res: any) => alert(res))
    //   .catch((error: any) => console.error(error));
    // this.sharedService.firebaseevent("NotificationPage", "");
    // this.checkDirectory();
    this.navCtrl.push("NotificationPage", {}, animationsOptions);
  }

  goToFav() {
    // this.sharedService.firebaseevent("FavouritePage", "");
    this.navCtrl.push("FavouritesPage", {}, animationsOptions);
  }
  goToAds(data) {
    this.sharedService.openBrowser(data);
  }
}
