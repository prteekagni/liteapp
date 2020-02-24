import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Content,
  Events,
  ModalController,
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { animationsOptions } from "../../app/env";

@IonicPage()
@Component({
  selector: "page-storepage",
  templateUrl: "storepage.html"
})
export class StorepagePage {
  @ViewChild(Slides) slides1: Slides;
  @ViewChild(Content) content: Content;
  slides;
  isLoggedIn: boolean = false;
  lnotification: any = [];
  isConnected: boolean;
  showToolbar: boolean;
  visibility: boolean = true;
  counter: any = 0;
  brandID: any;
  storelinks;
  defaultImage = "../../assets/images/logo.png";
  page: number = 1;
  catego: any = [];
  adsData: any = [];
  mainslide: any = [];
  brands: any = [];
  imgpath: any;
  counts: any = [];
  images: any = [];
  store: any = [];
  showMore: any = [];
  tempdata: any;
  featureID: string;
  title: string;
  tempcateg;
  count;
  tempStore: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private sharedService: SharedProvider,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private dealService: DealsProvider,
    private modalController: ModalController
  ) {
    this.showToolbar = false;
    this.firebaseDynamicLinks.onDynamicLink().subscribe(
      (res: any) => console.log(res),
      (error: any) => console.log(error)
    );
    this.tempdata = this.navParams.get("data");
    this.tempcateg = this.navParams.get("type");
    this.title = this.navParams.get("title");
    this.dealService
      .getStoreSubCategory(this.tempdata.ID)
      .subscribe((res: any) => {
        this.store = res;
        this.store.forEach(element => {
          if (element.Name == "Top Brands") {
            this.brandID = element.ID;
            console.log(element);
            this.dealService
              .getSubStores(element.CatPID, this.brandID)
              .subscribe((res: any) => {
                this.brands = res;
                console.log( "brands are " + this.brands);
              });
          }
        });
        for (
          this.count = 0;
          this.count < 3 && this.count < this.tempStore.length;
          this.count++
        ) {
          this.store.push(this.tempStore[this.count]);
        }
        console.log(this.store);
      });
  }

  ionViewDidLoad() {
    this.slides = [
      { image: "assets/bac.png" },
      { image: "http://elinfinitoindia.in/images/logo.png" }
    ];
  }

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {
    this.imgpath = localStorage.getItem("key") || "";
    this.events.subscribe("nstatus", res => {
      if (res == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });

    // this.dealService.getAdsData().subscribe(
    //   res => {
    //     this.adsData = res || [];
    //     if (this.adsData.length > 0) {
    //       this.mainslide = this.adsData.filter(x => x.category == "scroll");
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
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
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  toggleDisplay() {
    this.showMore = !this.showMore;
  }

  brandClick(data) {
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
}
