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
  description;
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

    // this.type.Description = this.type.Description.replace("/.", "/br");
   

    this.storageService.visitedDeals(this.type).then((res: any) => {
      console.log(res);

    });
    if (this.type.type == "push") {

      this.dealService.getDealByID(this.type.id).subscribe((res: any) => {
        console.log(this.deal);
        
        this.deal = res;
         this.description =
           this.deal.Description !== null
             ? this.deal.Description.split(".")
             : [];
      });
    } else {
      this.deal = this.navParams.get("data");
      this.services = this.navParams.get("type");
         this.description =
           this.deal.Description !== null
             ? this.deal.Description.split(".")
             : [];
      if (this.deal.hasOwnProperty("Coupon")) {
        {
          if (this.deal.Coupon !== null) {
            this.clipboard.copy(this.deal.Coupon).then(
              res => {
                this.sharedService.createToast(
                  "Coupon Copied " + this.deal.Coupon
                );
              },
              err => {
                console.log("Error in coping code");
              }
            );
          }
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealdetailPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
  shareApp(data) {
    this.sharedService.shareDeals(data);
    this.sharedService.firebaseevent("shareDeal", "");
  }

  getDeal() {
    this.sharedService.firebaseevent("Opened Deal", "");
    console.log(this.deal);

    this.sharedService.openBrowser(this.deal);
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
