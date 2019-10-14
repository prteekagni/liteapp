import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  Input
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  Searchbar,
  Keyboard,
  Item,
  Events
} from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";

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
  @Input() data;
  deals: any = [];
  subcategory: any = [];
  subdeals: any = [];
  tempdeals: any = [];
  tempsubdeals: any = [];
  copyItem;
  showMore: boolean = true;
  lastStore: boolean = false;
  type: string = "deals";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dealsprovider: DealsProvider,
    public keyboard: Keyboard,
    private events: Events
  ) {
    this.dealsprovider.getDealsCategory().subscribe((res: any) => {
      this.tempdeals = res;

      if (this.tempdeals.length >= 1) {
        for (
          let index = 0;
          index < 4 && index < this.tempdeals.length;
          index++
        ) {
          this.deals.push(this.tempdeals[index]);
        }
        console.log(this.deals);
      }
    });
    this.dealsprovider
      .getDealSubCategory("59378531-62f7-4cdd-af59-cfcfbb0d91f0")
      .subscribe((res: any) => {
        this.subdeals = res;
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
    console.log(this.showMore);
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
  }

  goToPage(data) {
    this.navCtrl.push("StorepagePage", {
      id: data.ID,
      type: "deals"
    });
  }
}
