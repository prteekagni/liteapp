import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Content,
  Events,
  Platform,
  ModalController
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { HttpClient } from "@angular/common/http";
import { animationsOptions } from "../../app/env";

/**
 * Generated class for the StorepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  stores: any = [];
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private sharedService: SharedProvider,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private dealService: DealsProvider,
    private http: HttpClient
  ) {
    this.showToolbar = false;
    this.firebaseDynamicLinks
      .onDynamicLink()
      .subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );

    this.tempdata = this.navParams.get("id");
    let tempcateg = this.navParams.get("type");
    this.title = this.navParams.get("title");
    console.log(this.tempdata + tempcateg);

    this.http
      .get(
        "http://192.168.225.36:52044/api/category/GetSubCategory/" +
          this.tempdata
      )
      .subscribe((res: any) => {
        this.store = res;
        console.log(this.store);

        // this.store.forEach(element => {
        //   if (element.Name == "Featured") {
        //     console.log(element);
        //     this.featureID = element.ID;
        //   }
        // });
      });

    this.http
      .get("http://192.168.225.36:52044/api/brand")
      .subscribe((res: any) => {
        this.brands = res;
        console.log(this.brands);
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
}
