import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  ModalController
} from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { SharedProvider } from "../../providers/shared/shared";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  segments = "0";
  @ViewChild("pageSlider") pageSlider: Slides;
  pushNotification: any;
  localNotification: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageProvider,
    private modalController: ModalController,
    private sharedService: SharedProvider
  ) {}

  ionViewDidLoad() {
    this.storageService.getPushNotification().then(res => {
      this.pushNotification = res;
      console.log(res);
    });
    this.storageService.getNotification().then(res => {
      this.localNotification = res;
      console.log(this.localNotification);
    });
  }

  selectTab(indx) {
    this.segments = indx;
    // this.tabsindex.emit(indx);
    this.pageSlider.slideTo(indx);
  }
  changeWillSlide($event) {
    // this.segments = $event._snapIndex.toString();
    //  this.segme.emit($event._snapIndex.toString());
    //  console.log($event._snapIndex.toString())
    this.segments = $event._snapIndex.toString();
  }

  slideindexs(index) {
    this.segments = index.toString();
  }

  getDeal(data) {
    this.sharedService.openBrowser(data.additionalData);
    // let dealmodal = this.modalController.create(
    //     "DealdetailPage",
    //     { data: data },
    //     {
    //       // cssClass: 'mymodal',
    //       showBackdrop: true,
    //       enableBackdropDismiss: true
    //     }
    //   );
    //   dealmodal.present();
  }

  getLocalDeal(item) {
    let dealmodal = this.modalController.create(
      "DealdetailPage",
      { data: item.data },
      {
        // cssClass: 'mymodal',
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );
    dealmodal.present();
  }

  removeLNotification(data) {
    this.storageService.removeNotification(data.id).then(
      res => {
        this.getData();
      },
      err => {
        console.log("Error in removing data");
      }
    );
  }
  getData() {
    this.sharedService.createLoader();
    this.storageService.getNotification().then(res => {
      this.localNotification = res || [];
      this.localNotification.forEach(element => {
        element.time = "";
      });
      this.sharedService.dismissLoader();
    });
  }
  doInfinite(data){}
}
