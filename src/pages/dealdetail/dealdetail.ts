import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  Platform
} from "ionic-angular";
import { Clipboard } from "@ionic-native/clipboard";
import { SharedProvider } from "../../providers/shared/shared";
import { DealsProvider } from "../../providers/deals/deals";
import { platformBrowser } from "@angular/platform-browser";
import { StorageProvider } from "../../providers/storage/storage";
import { NotificationProvider } from "../../providers/notification/notification";
declare var cordova;
@IonicPage({
  defaultHistory: ["DealsPage"]
})
@Component({
  selector: "page-dealdetail",
  templateUrl: "dealdetail.html"
})
export class DealdetailPage {
  deal: any;
  backbtn;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private clipboard: Clipboard,
    private sharedService: SharedProvider,
    private dealService: DealsProvider,
    private platform: Platform,
    private storageService: StorageProvider,
    private notificationService: NotificationProvider
  ) {
    // let a = this.navParams.get("data");
    this.deal = this.navParams.get("data");
    console.log(this.deal);

    if (this.deal.hasOwnProperty("Coupon")) {
      this.clipboard.copy(this.deal.Coupon).then(
        res => {
          this.sharedService.createToast("Coupon Copied" + this.deal.Coupon);
        },
        err => {
          console.log("coupon code not copy");
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealdetailPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
  shareApp() {
    this.sharedService.shareDeals(this.deal);
  }

  getDeal() {
    console.log(this.deal);
    this.sharedService.openBrowser(this.deal.Url);
  }

  ionViewWillLeave() {}

  setFav() {
    this.storageService.addDeals(this.deal).then(res => {
      if (res == true) {
        this.sharedService.createToast("Item added!");
        // this.newItem
        //   .filter(f => {
        //     return f.id == element.id;
        //   })
        //   .map(m => {
        //     m.isMatched = true;
        //   });
      } else {
        this.sharedService.createToast("Already in the list");
      }
    });
  }

  setReminder() {
    this.notificationService.remindBtn(time => {
      this.notificationService.setNotification(this.deal, time).then(res => {
        if (res == true) {
          this.sharedService.createToast("Reminder Updated");
        } else {
          this.sharedService.createToast("Reminder Scheduled");
        }
      });
    });
  }
}
