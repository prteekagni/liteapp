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
  deals: any = [];
  subcategory: any = [];
  subdeals: any = [];
  tempdeals: any = [];
  tempsubdeals: any = [];
  copyItem;
  showMore: boolean = false;
  lastStore: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dealsprovider: DealsProvider,
    public keyboard: Keyboard
  ) {
    this.dealsprovider.getDealSubCategory().subscribe((res: any) => {
      this.tempsubdeals = res;
      for (let index = 0; index < 3; index++) {
        this.subdeals.push(this.tempdeals[index]);
      }
    });

    this.dealsprovider.getDealsCategory().subscribe((res: any) => {
      this.tempdeals = res;
      for (let index = 0; index < 4; index++) {
        this.deals.push(this.tempdeals[index]);
      }
    });
  }

  ionViewWillEnter() {}

  scrollHandler(event) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealsPage");
  }

  toggleDisplay() {
    if (this.tempsubdeals.length !== this.subdeals.length) {
      for (var ii = this.subdeals.length; ii < this.tempdeals.length; ii++) {
        this.subdeals.push(this.tempdeals[ii]);
      }
    }
    this.showMore = !this.showMore;
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
    if (this.deals.length !== this.tempdeals.length) {
      for (let index = 0; index < this.tempdeals.length - 4; index++) {
        console.log(this.tempdeals[index + 4]);
        this.deals.push(this.tempdeals[index + 3]);
      }
      // event.complete();
    } else {
      // event.enable(false);
    }
    setTimeout(() => {
      event.complete();
    }, 1000);
    this.lastStore = true;
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  goToPage() {
    this.navCtrl.push("StorepagePage");
  }
}
