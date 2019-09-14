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
import { StorageProvider } from "../../providers/storage/storage";
import { map } from "rxjs/operators";
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
    console.log(this.tempdata);

    this.http
      .get(
        "http://localhost:52044/api/category/GetSubCategory/" + this.tempdata
      )
      .subscribe((res: any) => {
        this.store = res;
        console.log(res);
      });

    // this.store = [
    //   {
    //     Name: "Men's Shopping",
    //     CatType: "1",
    //     id: "6BE73FBB-B1BF-48F9-856B-00AD284D0475"
    //   },
    //   {
    //     Name: "Food",
    //     CatType: "1",
    //     id: "A35E6898-A7C3-4961-B5D6-071B568498B2"
    //   },
    //   {
    //     Name: "Mobiles",
    //     CatType: "1",
    //     id: "A35E6798-A7C3-4961-B5D6-071B568498B2"
    //   },
    //   {
    //     Name: "Electronics",
    //     CatType: "1",
    //     id: "A35E6998-A7C3-4961-B5D6-071B568498B2"
    //   },

    //   {
    //     Name: "Gadgets",
    //     CatType: "1",
    //     id: "A28E6898-A7C3-4961-B5D6-071B568498B2"
    //   },

    //   {
    //     Name: "Travel",
    //     CatType: "1",
    //     id: "A35E6898-A7C3-4961-B5D6-078B568498B2"
    //   },
    //   {
    //     Name: "Headphones",
    //     CatType: "2",
    //     id: "A35E6898-A7C3-3961-B5D6-071B568498B2",
    //     CatPID: "A28E6898-A7C3-4961-B5D6-071B568498B2",
    //     Image: "http://elinfinitoindia.in/images/logo.png"
    //   },
    //   {
    //     Name: "Bands",
    //     CatType: "2",
    //     id: "A35E6008-A7C3-3961-B5D6-071B568498B2",
    //     CatPID: "A28E6898-A7C3-4961-B5D6-071B568498B2",
    //     Image: "http://elinfinitoindia.in/images/logo.png"
    //   },
    //   {
    //     Name: "Health Drinks",
    //     CatType: "2",
    //     id: "A35E6898-A7C3-3961-B5D6-071B56849992",
    //     CatPID: "A35E6898-A7C3-4961-B5D6-071B568498B2",
    //     Image: "http://elinfinitoindia.in/images/logo.png"
    //   }
    // ];
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
    // this.dealService
    //   .getStoreLinks()
    //   .pipe(map((res: any) => res.filter(resp => resp.StoreType == "1")))
    //   .subscribe((res: any) => {
    //     this.store = res;
    //     console.log(res);
    //   });

    // this.http
    //   .get("http://localhost:3000/subcat")
    //   .pipe(map((res: any) => res.filter(resp => resp.StoreType == 1)))
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.store = res;
    //   });

    this.imgpath = localStorage.getItem("key") || "";
    this.events.subscribe("nstatus", res => {
      if (res == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });

    this.dealService.getAdsData().subscribe(
      res => {
        this.adsData = res || [];
        if (this.adsData.length > 0) {
          this.mainslide = this.adsData.filter(x => x.category == "scroll");
        }
      },
      err => {
        console.log(err);
      }
    );
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
