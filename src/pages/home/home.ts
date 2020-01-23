import {
  Component,
  ViewChild,
  NgZone,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Platform,
  Content,
  Slides,
  ModalController,
  InfiniteScroll
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ScrollHideConfig } from "../../directives/scroll/scroll";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StorageProvider } from "../../providers/storage/storage";
import { CardgridComponent } from "../../components/cardgrid/cardgrid";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from "@angular/animations";
import { ReplaySubject } from "rxjs";
import { count } from "rxjs/operator/count";
import { map } from "rxjs/operators";
const animationsOptions = {
  animation: "ios-transition",
  duration: 1000
};

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  animations: [
    trigger("photosAnimation", [
      transition("* => *", [
        query(".substores", style({ transform: "translateX(-100%)" }), {
          optional: true
        }),
        query(
          ".substores",
          stagger("100ms", [
            animate("500ms", style({ transform: "translateX(0)" }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomePage implements AfterViewInit {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 44
  };

  @ViewChild(Slides) slides1: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild(CardgridComponent) cardgridd: CardgridComponent;
  topstoredata: ReplaySubject<any> = new ReplaySubject(1);
  slides;
  isLoggedIn: boolean = false;
  lnotification: any = [];
  isConnected: boolean = true;
  showToolbar: boolean;
  visibility: boolean = true;
  counter: any = 0;
  stores: any = [];

  testdemo;
  defaultImage = "../../assets/images/logo.png";
  mVisitedDeals: any = [];
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
  allstores: any[];
  itemLogo: any = "assets/imgs/dealslocker1.png";
  adsStore:any = [];
  
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
          this.tempStore = res.filter(opt => opt.CatType == 1);
          console.log("From Store API " + this.tempStore.length);
          this.substores = res.filter(opt => opt.CatType == 11);
          // this.brands = res.filter(opt => opt.CatType == 100);
          if (this.tempStore.length > 1) {
            for (
              var count = 0;
              count < 1 && count < this.tempStore.length;
              count++
            ) {
              console.log("Count for stores " + count);
              this.store.push(this.tempStore[count]);
              console.log(this.store);
            }
          }
        }

        //   this.dealService.getFeatureStore().subscribe((res: any) => {
        //     this.substores = res;
        //     console.log(this.substores);
        //     WOW.sync;
        //   });
      });

      // this.dealService.getTopBrands().subscribe(
      //   (res: any) => {
      //     this.brands = res;
      //     console.log(this.brands);
      //     WOW.sync;
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );

      // this.dealService.getAllStores();

      this.dealService.getAdsData().subscribe(
        (res: any) => {
          this.adsData = res;
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
      this.dealService.getAllStores();
    //  this.dealService.storesdata.subscribe((res:any)=>{
   this.dealService
     .getAdsData()
     .pipe(map((res: any) => res.filter(resp => resp.Category.Name === "Ads")))
     .subscribe((res: any) => {
       console.log(res);
       this.adsData = res;
     });
    }

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {
    this.storageService.getVisitedStores().then((res: any) => {
      this.topVisitedStores = res || 0;
      console.log(this.topVisitedStores);
      if (this.topVisitedStores.length > 0) {
        this.topVisitedStores = this.topVisitedStores.sort(function(a, b) {
          return b.frequency - a.frequency;
        });
      }
    });
    this.storageService.getVisitedDealCategory().then((res: any) => {
      this.mVisitedDeals = res || 0;
      console.log(this.mVisitedDeals);
      if (this.mVisitedDeals.length > 0)
        this.mVisitedDeals = this.mVisitedDeals.sort(function(a, b) {
          return b.frequency - a.frequency;
        });
    });
  }

  goToAds(data){
    this.sharedService.openBrowser(data);
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

  ionViewWillLeave() {}

  doInfinite(event) {
    console.log("loading event called");
    if (this.store.length < this.tempStore.length) {
      for (
        let cindex = 0;
        cindex < 4 &&
        cindex < this.tempStore.length &&
        this.store.length < this.tempStore.length;
        cindex++
      ) {
        this.store.push(this.tempStore[this.store.length]);
      }
      event.complete();
      // this.lastStore = true;
      // event.enable(false);
    } else {
      this.lastStore = true;
      setTimeout(() => {
        event.enable(false);
      }, 500);
    }
  }
  // doInfinite(infiniteScroll: InfiniteScroll) {
  //     // infiniteScroll.complete();
  //       console.log("loading event called");

  // if (this.store.length < this.tempStore.length) {
  //      console.log("Stores length not less than");
  //     var templength = this.store.length;
  //     for (let cindex = 1; cindex < 4 &&  cindex < this.tempStore.length  ; cindex++) {
  //       this.store.push(this.tempStore[this.store.length]);
  //       console.log("Store length " + this.store.length);
  //     }
  //      setTimeout(() => {
  //     infiniteScroll.complete();
  //       }, 2000);
  //     }
  //     else {
  //     // infiniteScroll.complete();
  //     this.lastStore = true;
  //     setTimeout(() => {
  //    infiniteScroll.enable(false);
  //     }, 500);

  //   }
  // // setTimeout(() => {
  // //    this.lastStore = true;
  // //   infiniteScroll.enable(false);
  // // }, 3000);
  //   }

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
        type: type,
        title: data.Name
      })
      .then(
        (res: any) => {
          // this.sharedService.firebaseevent("StorePage", "");
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
    // this.dealService.getFeatureStore().subscribe((res: any) => {
    //   this.substores = res;
    //   console.log(this.substores);
    // });

    // this.dealService.getTopBrands().subscribe(
    //   (res: any) => {
    //     this.brands = res;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

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

  search() {
    this.navCtrl.push("SearchPage", {
      data: this.cardgridd.items,
      type: "stores"
    });
  }

  ngAfterViewInit(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    // wow.init()
  }
  getAllDeals(data) {
    this.storageService
      .visitedDealCategory(data)
      .then((res: any) => console.log(res));

    console.log(data);
    this.navCtrl
      .push("StabsPage", {
        data: data.data
      })
      .then(
        res => {},
        err => {
          this.sharedService.createToast("Sorry !!");
        }
      );
  }

  getVistedDeal(data){
     this.navCtrl
      .push("StabsPage", {
        data: data.data
      })
      .then(
        res => {},
        err => {
          this.sharedService.createToast("Sorry !!");
        }
      );
  }
}
