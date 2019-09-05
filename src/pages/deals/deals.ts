import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  ItemSliding,
  Platform,
  Events,
  Searchbar,
  Keyboard
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
  @ViewChild(Searchbar) searchbar: Searchbar;
  deals;
  items;
  subcategory: any = [];
  mobiless;
  mfashion;
  copyItem;

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
    private dealsprovider: DealsProvider,
    public keyboard: Keyboard
  ) {}

  ionViewWillEnter() {
    // this.mobile = true;

    // this.dealsprovider
    //   .getDealsCategory()
    //   .pipe(map((res: any) => res.filter(resp => resp.CatType == "1")))
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.deals = res;
    //   });

    this.http
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .subscribe((res: any) => (this.deals = res));
    console.log("willenter");
  }

  scrollHandler(event) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealsPage");
  }

  onInput(event) {
    this.deals = this.copyItem;
    const val = event.target.value;
    console.log(val);
    if (val && val.trim() != "") {
      this.deals = this.deals.filter(item => {
        return item.employee_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
    this.content
      .scrollToTop()
      .then(res => console.log(res), err => console.warn(err));
  }

  setFocus() {
    setTimeout(() => {
      if (!this.searchbar._isFocus) {
        this.searchbar.setFocus();
      } else {
        this.setFocus();
      }
    }, 1000);
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
