import { Component, ViewChild, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Platform,
  Content,
  Slides
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ScrollHideConfig } from "../../directives/scroll/scroll";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";
import { Subject } from "rxjs";
import { locateHostElement } from "@angular/core/src/render3/instructions";
import { map } from "rxjs/operators";

const animationsOptions = {
  animation: "ios-transition",
  duration: 1000
};

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 44
  };

  @ViewChild(Slides) slides1: Slides;
  @ViewChild(Content) content: Content;
  slides;
  isLoggedIn: boolean = false;
  lnotification: any = [];
  isConnected: boolean = true;
  showToolbar: boolean;
  visibility: boolean = true;
  counter: any = 0;
  stores: any = [];
  count;

  defaultImage = "../../assets/images/logo.png";

  adsData: any = [];
  mainslide: any = [];
  brands: any = [];
  store: any = [];
  items: any = [];
  tempStore: any = [];
  substores: any = [];
  shopbyID: any;
  lastStore: boolean = false;
  fileTransfer;
  mobile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private sharedService: SharedProvider,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private dealService: DealsProvider,
    private firebaseAnalytics: FirebaseAnalytics,
    private ngZone: NgZone
  ) {
    // platform.ready().then(() => {
    //   this.firebaseAnalytics
    //     .logEvent("page_view", { page: "dashboard" })
    //     .then((res: any) => console.log(res))
    //     .catch((error: any) => console.error(error));
    //   // this.checkDirectory();
    //   this.sharedService.checkNetworkStatus().subscribe(
    //     res => {
    //       if (res) {
    //         this.ngZone.run(() => {
    //           this.isConnected = true;
    //         });

    //         console.log("Internet COnnected");
    //       } else {
    //         this.ngZone.run(() => {
    //           this.isConnected = false;
    //         });
    //         this.sharedService.createToast("No Internet Avaiable");
    //         console.log("Internet npot connected");
    //       }
    //     },
    //     err => {
    //       alert("Error in checking network statua");
    //     }
    //   );
    // });

    platform.resume.subscribe(() => {
      this.sharedService.checkNetworkStatus().subscribe(
        res => {
          if (res) {
            this.isConnected = true;
            console.log("Internet COnnected");
          } else {
            this.isConnected = false;
            this.sharedService.createToast("No Internet Avaiable");
            console.log("Internet npot connected");
          }
        },
        err => {
          alert("Error in checking network statua");
        }
      );
    });

    this.showToolbar = false;

    // On Click of dynamic Link
    // this.firebaseDynamicLinks
    //   .onDynamicLink()
    //   .subscribe(
    //     (res: any) => console.log(res),
    //     (error: any) => console.log(error)
    //   );

    this.dealService.getStoreCategory().subscribe((res: any) => {
      console.log(res);
      
      if (res) {
        res.forEach(element => {
          this.tempStore.push(element);
          if (element.Name == "Shop By Category") {
            this.shopbyID = element.ID;
          }
        });
        for (
          this.count = 0;
          this.count < 3 && this.count < this.tempStore.length;
          this.count++
        ) {
          this.store.push(this.tempStore[this.count]);
        }
      }
      // this.dealService
      //   .getStoreSubCategory(this.shopbyID)
      //   .subscribe((res: any) => {
      //     this.substores = res;
      //   });
      this.dealService.getFeatureStore()
      .subscribe((res:any)=>{ 
        this.substores = res
        console.log(this.substores);
      });
    });
    this.dealService
      .getTopBrands()
      .pipe(
        map((res: any) =>
          res.filter(resp  => 
            resp.BrandType == "M"
          )))
      .subscribe(
        (res: any) => {
          this.brands = res;
          console.log(this.brands);
          
        },
        err => {
          console.log(err);
        }
      );

    this.dealService.getAllStores();

    this.dealService.getAdsData().subscribe(
      (res: any) => {
        this.mainslide = res;
      },
      err => {
        console.log(err);
      }
    );
    // this.events.subscribe("nstatus", res => {
    //   if (res) {
    //     console.log("Home PAge:" + res);
    //     this.ngZone.run(() => {
    //       this.isConnected = true;
    //     });
    //   } else {
    //     console.log("From Home Page " + res);
    //     this.ngZone.run(() => {
    //       this.isConnected = false;
    //     });
    //   }
    // });
  }

  ionViewDidLoad() {
    // this.events.subscribe("nstatus", res => {
    //   if (res) {
    //     console.log("Home PAge:" + res);
    //   } else {
    //     console.log("From Home Page " + res);
    //     this.isConnected = false;
    //   }
    // });
  }

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {}

  goToNotification() {
    this.firebaseAnalytics
      .logEvent("share", { name: "notification" })
      .then((res: any) => alert(res))
      .catch((error: any) => console.error(error));
    // this.checkDirectory();
    this.navCtrl.push("NotificationPage", {}, animationsOptions);
  }

  goToFav() {
    this.navCtrl.push("FavouritesPage", {}, animationsOptions);
  }

  ionViewWillLeave() {}

  doInfinite(event) {
    this.dealService.storesdata.subscribe((res: any) => {
      console.log(res);
    });
    if (this.store.length <= this.tempStore.length) {
      console.log(this.store.length);
      console.log(this.tempStore.length);
      for (let cindex = 0; cindex < 4; cindex++) {
        this.store.push(this.tempStore[this.count]);
        this.count++;
      }
      setTimeout(() => {
        event.complete();
      }, 500);
    } else {
      this.lastStore = true;
      event.enable(false);
    }
  }

  goToPage(data) {
    console.log(data);
    var type;
    if(data.CatType == 11){
      type = "substores"
    }
    else{
       type = "stores";
    }
    this.navCtrl.push("StorepagePage", {
      data: data,
      type: type,
    });
  }
}
