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
  type;
  services;
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
    this.type = this.navParams.get("data");
  this.storageService.visitedDeals(this.type).then((res:any)=>{
    console.log(res);
    
  })
    if (this.type.type == "push") {
      this.dealService.getDealByID(this.type.id).subscribe((res: any) => {
        this.deal = res;
      });
    } else {
      this.deal = this.navParams.get("data");
         this.services = this.navParams.get("type");
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealdetailPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
  shareApp() {
    this.sharedService.shareDeals(this.deal);
     this.sharedService.firebaseevent("shareDeal", "");
  }

  getDeal(data) {
    this.sharedService.firebaseevent("Opened Deal", "");
     this.sharedService.openBrowser(data);
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
  reportIssue() {}
}
