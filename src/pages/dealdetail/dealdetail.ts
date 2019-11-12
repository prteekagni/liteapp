import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Clipboard } from "@ionic-native/clipboard";
import { SharedProvider } from "../../providers/shared/shared";

import { DealsProvider } from "../../providers/deals/deals";
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private clipboard: Clipboard,
    private sharedService: SharedProvider,
    private dealService: DealsProvider,
    
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealdetailPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
  shareApp() {

    this.dealService.createDynamicLinks();
    // cordova.plugins.firebase.dynamiclinks
    //   .createShortDynamicLink({
    //     link: this.deal.Url
    //   })
    //   .then(
    //     function(url) {
    //       console.log("Dynamic link was created:", url);

    //       this.socialSharing
    //         .share(this.deal.Name, "", this.deal.Logo, url)
    //         .then(
    //           res => {
    //             console.log(res);
    //           },
    //           err => {
    //             console.log(err);
    //           }
    //         );
    //     },
    //     err => {
    //       this.socialSharing.share(this.deal.Name, "", this.deal.Logo).then(
    //         res => {
    //           console.log(res);
    //         },
    //         err => {
    //           console.log(err);
    //         }
    //       );
    //     }
    //   );
  
  }

  getDeal(){
    this.sharedService.openBrowser(this.deal.Url)
  }
}
