import { Component, ViewChild, NgZone, ElementRef, AfterViewInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Platform,
  Content,
  Slides,
  ModalController
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ScrollHideConfig } from "../../directives/scroll/scroll";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StorageProvider } from "../../providers/storage/storage";

const animationsOptions = {
  animation: "ios-transition",
  duration: 1000
};

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements AfterViewInit {
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
  testdemo;
  defaultImage = "../../assets/images/logo.png";

  adsData: any = [];
  mainslide: any = [];
  brands: any = [];
  store: any = [];
  items: any = [];
  tempStore: any = [];
  substores: any = [];
  visitedStores: any = [];
  topVisitedStores: any = [];
  shopbyID: any;
  lastStore: boolean = false;
  fileTransfer;
  mobile;
  itemLogo:any = "assets/imgs/dealslocker1.png";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private sharedService: SharedProvider,
    private dealService: DealsProvider,
    private ngZone: NgZone,
    private modalController: ModalController,
    private storageService: StorageProvider
  ) {
    platform.ready().then(() => {
      // this.checkDirectory();
      this.sharedService.checkNetworkStatus().subscribe(
        res => {
          if (res) {
            this.ngZone.run(() => {
              this.isConnected = true;
            });

            console.log("Internet COnnected");
          } else {
            this.ngZone.run(() => {
              this.isConnected = false;
            });
            this.sharedService.createToast("No Internet Avaiable");
            console.log("Internet npot connected");
          }
        },
        err => {
          alert("Error in checking network statua");
        }
      );
    });

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
      if (res) {
        this.tempStore = res;
        for (
          this.count = 0;
          this.count < 3 && this.count < this.tempStore.length;
          this.count++
        ) {
          this.store.push(this.tempStore[this.count]);
        }
      }

      this.dealService.getFeatureStore().subscribe((res: any) => {
        this.substores = res;
        console.log(this.substores);
      });
    });

    this.dealService.getTopBrands().subscribe(
      (res: any) => {
        this.brands = res;
        console.log(this.brands);
      },
      err => {
        console.log(err);
      }
    );

    // this.dealService.getAllStores();

    this.dealService.getAdsData().subscribe(
      (res: any) => {
        this.mainslide = res;
      },
      err => {
        console.log(err);
      }
    );
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
    this.storageService.getVisitedStores().then((res: any) => {
      this.tempStore = res || 0;
      this.topVisitedStores = this.tempStore.sort(function(a, b) {
        return b.frequency - a.frequency;
      });
    });
  }

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {}

  goToNotification() {
    // this.firebaseAnalytics
    //   .logEvent("gTNotification","")
    //   .then((res: any) => alert(res))
    //   .catch((error: any) => console.error(error));
    // this.sharedService.firebaseevent("gToNotificaitonP", "");
    // this.checkDirectory();
    this.navCtrl.push("NotificationPage", {}, animationsOptions);
  }

  goToFav() {
    // this.sharedService.firebaseevent("gToFavouriteP", "");
    this.navCtrl.push("FavouritesPage", {}, animationsOptions);
  }

  ionViewWillLeave() {}

  ngAfterViewInit() {
    debugger;
    console.log("Done");
    
  }

  doInfinite(event) {
    console.log("loading event called");
    this.dealService.storesdata.subscribe((res: any) => {
      console.log(res);
    });
    if (this.store.length <= this.tempStore.length) {
      for (let cindex = 0; cindex < 4; cindex++) {
        this.store.push(this.tempStore[this.count]);
        this.count++;
        if (cindex == 3) {
          event.complete();
        }
      }
    } else {
      this.lastStore = true;
      event.enable(false);
    }
  }

  goToPage(data) {
    var type;
    if (data.CatType == 11) {
      type = "substores";
    } else {
      type = "stores";
    }
    this.navCtrl
      .push("StorepagePage", {
        data: data,
        type: type
      })
      .then(
        (res: any) => {
          // this.sharedService.firebaseevent("gToStorePage", "");
        },
        err => {
          // this.sharedService.createToast("Sorry!!");
        }
      );
  }

  generate() {}

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    // this.tempStore = [];
    // this.dealService.getStoreCategory().subscribe((res: any) => {
    //   if (res) {
    //     res.forEach(element => {
    //       this.tempStore.push(element);
    //       if (element.Name == "Shop By Category") {
    //         this.shopbyID = element.ID;
    //       }
    //     });
    //     for (
    //       this.count = 0;
    //       this.count < 3 && this.count < this.tempStore.length;
    //       this.count++
    //     ) {
    //       this.store.push(this.tempStore[this.count]);
    //     }
    //   }

    // });
    this.dealService.getFeatureStore().subscribe((res: any) => {
      this.substores = res;
      console.log(this.substores);
    });

    this.dealService.getTopBrands().subscribe(
      (res: any) => {
        this.brands = res;
      },
      err => {
        console.log(err);
      }
    );

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }

  brandMethod(data) {
    if (Array.isArray(data.Url)) {
      let modal = this.modalController.create(
        "LinkmodalPage",
        {
          data: data
        },
        {
          cssClass: "my-modal",
          showBackdrop: true,
          enableBackdropDismiss: true
        }
      );
      modal.present();
    } else {
      this.sharedService.openBrowser(data);
    }
  }
  onTopBrandClick(data) {
    let modal = this.modalController.create(
      "LinkmodalPage",
      {
        data: data
      },
      {
        cssClass: "my-modal",
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );
    modal.present();
  }
  gotToAds(data) {
    console.log(data);
  }

  goToTopVisitedStore(data) {
    this.sharedService.openBrowser(data);
  }

  removeVistedStore() {
    this.storageService.removeVisitedStores();
  }
}
