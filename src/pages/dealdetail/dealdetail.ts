import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Clipboard } from "@ionic-native/clipboard";
import { SharedProvider } from "../../providers/shared/shared";

@IonicPage({
  defaultHistory: ["DealsPage"]
})
@Component({
  selector: "page-dealdetail",
  templateUrl: "dealdetail.html"
})
export class DealdetailPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private clipboard: Clipboard,
    private sharedService: SharedProvider
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
    let a = this.navParams.get("id");
    console.log(a);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealdetailPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
