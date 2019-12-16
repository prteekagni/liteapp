import {
  Component,
  ViewChild,
  Input,
  NgZone
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  Searchbar,
  Keyboard,
  Events
} from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { SharedProvider } from "../../providers/shared/shared";


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
  test: any = [];
  isConnected: boolean = true;
  shopByCateory;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dealsprovider: DealsProvider,
    public keyboard: Keyboard,
    private events: Events,
    private ngZone: NgZone,
    private sharedService:SharedProvider
  ) {
    
    this.dealsprovider.getDealsCategory().subscribe((res: any) => {
      this.deals = res;
      this.test = res;
    });
    this.dealsprovider.getDealSubCategory().subscribe((res: any) => {
      this.subdeals = res;
    });
    this.events.subscribe("nstatus", res => {
      if (res) {
        this.ngZone.run(() => {
          this.isConnected = true;
        });
      } else {
        this.ngZone.run(() => {
          this.isConnected = false;
        });
      }
    });
  }

  ionViewWillEnter() {
    // this.sharedService.firebaseevent("DealsPage","");
  }

  scrollHandler(event) {}

  ionViewDidLoad() {
    
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
    this.content.scrollToTop().then(
      res => console.log(res),
      err => console.warn(err)
    );
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
      data: data,
      type: "deals"
    });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }

  getAllDeals(data) {
    console.log(data);
    this.navCtrl.push("StabsPage", {
      data: data
    }).then(res=>{},err=>{
      this.sharedService.createToast("Sorry !!")
    });
  }
}
