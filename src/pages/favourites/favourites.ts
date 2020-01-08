import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { SharedProvider } from "../../providers/shared/shared";
import { NotificationProvider } from "../../providers/notification/notification";

const animationsOptions = {
  animation: "ios-transition",
  duration: 500
};

@IonicPage()
@Component({
  selector: "page-favourites",
  templateUrl: "favourites.html"
})
export class FavouritesPage {
  newItem: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageProvider,
    public sharedService: SharedProvider,
    public modalController : ModalController,
    public notificationService: NotificationProvider
  ) {

     this.sharedService.firebaseevent("screen_view", { Name: "FavouritePage" });
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.sharedService.createLoader();
    this.storageService.getDeals().then(res => {
      this.newItem = res || [];

      this.newItem.forEach(element => {
        element.time = "";
      });
      this.sharedService.dismissLoader();
    });
  }

  remove(data) {
    console.log(data);
    this.storageService.deleteDeals(data.ID).then(
      res => {
        this.getData();
      },
      err => {
        console.log("Error in removing data");
      }
    );
  }
  remindBtn(item) {
    this.notificationService.remindBtn(time => {
      this.notificationService.setNotification(item, time).then(res => {
        if (res == true) {
          this.sharedService.createToast("Reminder Updated");
        } else {
          this.sharedService.createToast("Reminder Scheduled");
        }
      });
    });
  }

  getDeal(data) {
    let dealmodal = this.modalController.create(
      "DealdetailPage",
      { data: data },
      {
        // cssClass: 'mymodal',
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );

    dealmodal.present();
  }

  backPage() {
    this.navCtrl.pop(animationsOptions);
  }
}
