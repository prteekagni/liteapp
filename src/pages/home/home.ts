import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Platform,
  ModalController,
  Content,
  Slides
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ScrollHideConfig } from "../../directives/scroll/scroll";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { HttpClient } from "@angular/common/http";
import { StorageProvider } from "../../providers/storage/storage";
import { map, take } from "rxjs/operators";

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
  isConnected: boolean;
  showToolbar: boolean;
  visibility: boolean = true;
  counter: any = 0;
  stores: any = [];

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private sharedService: SharedProvider,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private dealService: DealsProvider
  ) {
    platform.ready().then(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
      // this.checkDirectory();
    });

    platform.resume.subscribe(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    });

    this.showToolbar = false;

    // On Click of dynamic Link
    this.firebaseDynamicLinks
      .onDynamicLink()
      .subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );

    this.dealService.getStoreCategory().subscribe((res: any) => {
      this.tempStore = res;
      if (this.tempStore) {
        this.tempStore.forEach(element => {
          if (element.Name == "Shop By Category") {
            this.shopbyID = element.ID;
          }
        });
        for (
          let index = 0;
          index < 4 && index < this.tempStore.length;
          index++
        ) {
          this.store.push(this.tempStore[index]);
        }
      }
      this.dealService
        .getStoreSubCategory(this.shopbyID)
        .subscribe((res: any) => {
          this.substores = res;
        });
    });
    this.dealService.getTopBrands().subscribe(
      (res: any) => {
        this.brands = res;
      },
      err => {
        console.log(err);
      }
    );

    // this.dealService.getAdsData().subscribe(
    //   (res: any) => {
    //     this.adsData = res;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  ionViewDidLoad() {}

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {
    this.events.subscribe("nstatus", res => {
      if (res == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });
  }

  goToNotification() {
    this.navCtrl.push("NotificationPage", {}, animationsOptions);
  }

  goToFav() {
    this.navCtrl.push("FavouritesPage", {}, animationsOptions);
  }

  toggle() {
    this.isConnected = !this.isConnected;
  }

  ionViewWillLeave() {}

  doInfinite(event) {
    if (this.store.length !== this.tempStore.length) {
      for (let index = 0; index < this.tempStore.length - 4; index++) {
        this.store.push(this.tempStore[index + 3]);
      }
    } else {
      event.enable(false);
    }
    setTimeout(() => {
      event.complete();
    }, 500);
    this.lastStore = true;
  }

  goToPage(data) {
    console.log(data);
    this.navCtrl.push("StorepagePage", {
      id: data.ID,
      type: "store"
    });
  }
}
