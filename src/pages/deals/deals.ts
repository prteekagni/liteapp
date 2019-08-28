import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  ItemSliding,
  Platform,
  Events
} from "ionic-angular";
import { AppMinimize } from "@ionic-native/app-minimize";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { map } from "rxjs/operators";
import { filter } from "rxjs/operators";
/**
 * Generated class for the DealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-deals",
  templateUrl: "deals.html"
})
export class DealsPage {
  @ViewChild(Content) content: Content;
  deals;
  items;
  subcategory: any = [];
  mobiless;
  mfashion;

  public mensf;
  public mobile: boolean;
  public mensfashion;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer,
    private elem: ElementRef,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private events: Events,
    private http: HttpClient,
    private dealsprovider: DealsProvider
  ) {}

  ionViewWillEnter() {
    // this.mobile = true;

    this.dealsprovider
      .getDealsCategory()
      .pipe(map((res: any) => res.filter(resp => resp.CatType == "1")))
      .subscribe((res: any) => {
        console.log(res);
        this.deals = res;
      });
    console.log("willenter");
  }

  scrollHandler(event) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealsPage");
  }

  viewMore(data) {}

  goTo() {
    this.navCtrl.push("ProductlistPage");
  }

  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
