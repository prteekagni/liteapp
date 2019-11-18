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
    private platform: Platform
  ) {
    if ("couponcode") {
      this.clipboard.copy("couponcode").then(
        res => {
          this.sharedService.createToast("Coupon Copied");
        },
        err => {
          console.log("coupon code not copy");
        }
      );
    }
    let a = this.navParams.get("data");
    this.deal = this.navParams.get("data");
    console.log(a);

    // this.backbtn = platform.registerBackButtonAction(() => {
    //   this.viewController.dismiss();
    // }, 100);
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
    this.sharedService.openBrowser(this.deal.Url);
  }

  ionViewWillLeave() {
  }
}
