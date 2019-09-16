import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  ToastController,
  AlertController,
  ModalController,
  Searchbar
} from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { deals } from "../../models/deal";
import { NotificationProvider } from "../../providers/notification/notification";
import { SharedProvider } from "../../providers/shared/shared";
import { DealsProvider } from "../../providers/deals/deals";

@IonicPage()
@Component({
  selector: "page-productlist",
  templateUrl: "productlist.html"
})
export class ProductlistPage {
  @ViewChild(Content) _content: Content;
  @ViewChild(Searchbar) searchbar: Searchbar;

  de: any = [];
  lnotification: any = [];
  items;
  newItem: any = [];
  saveItem: any = [];
  updatedList;
  searchTerm: string;
  copyItem: any = [];
  searchBoxOpened: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageProvider,
    private toastController: ToastController,
    private notificationService: NotificationProvider,
    public alertCtrl: AlertController,
    public sharedService: SharedProvider,
    private modalController: ModalController,
    private dealService: DealsProvider
  ) {
    let id = this.navParams.get("id");
    let type = this.navParams.get("type");

    if (type == "deals") {
      this.dealService.getDealsByCategory(id).subscribe((res: any) => {
        this.newItem = res;
      });
    } else {
      this.dealService.getProductByCategory(id).subscribe((res: any) => {
        this.newItem = res;
      });
    }

    // this.http
    //   .get("http://dummy.restapiexample.com/api/v1/employees")
    //   .subscribe(res => {
    //     this.newItem = res;
    //     this.copyItem = this.newItem;
    //     // this.storageService.getDeals().then((res: any) => {
    //     //   this.saveItem = res;
    //     //   var same = this.newItem
    //     //     .filter(f => {
    //     //       return this.saveItem.find(ff => ff.id === f.id);
    //     //     })
    //     //     .map(m => {
    //     //       return (m.isMatched = true);
    //     //     });
    //     console.log(this.newItem);
    //   });
    // // });
  }

  ionViewDidLoad() {
    // this.storageService.getDeals().then(res => {
    //   this.de = res;
    //   this.de.forEach(element => {
    //     element.time = "";
    //   });
    // });
  }

  onInput(event) {
    this.newItem = this.copyItem;
    const val = event.target.value;
    console.log(val);
    if (val && val.trim() != "") {
      this.newItem = this.newItem.filter(item => {
        return item.employee_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
    this._content
      .scrollToTop()
      .then(res => console.log(res), err => console.warn(err));
  }

  setFocus() {
    setTimeout(() => {
      if (!this.searchbar._isFocus) {
        this.searchbar.setFocus();
      } else {
        console.log("already in focus");
      }
    }, 500);
  }

  ionViewWillEnter() {}

  setDealAsFav(element) {
    this.storageService.addDeals(element).then(res => {
      if (res == true) {
        this.showToast("Item added!");
        this.newItem
          .filter(f => {
            return f.id == element.id;
          })
          .map(m => {
            m.isMatched = true;
          });
      } else {
        this.showToast("Already in the list");
      }
    });
  }
  remindBtn(item) {
    this.notificationService.remindBtn(time => {
      this.notificationService.setNotification(item, time).then(res => {
        if (res == true) {
          this.showToast("Reminder Updated");
        } else {
          this.showToast("Reminder Scheduled");
        }
      });
    });
  }

  setAsFav(data) {
    this.sharedService.addToFavEventTrack(data);

    this.storageService.addDeals(data).then(res => {
      if (res == true) {
        this.showToast("Deal added to favourite");
      } else {
        this.showToast("Deal already present");
      }
    });
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getDeal() {
    let dealmodal = this.modalController.create(
      "DealdetailPage",
      {},
      {
        // cssClass: 'mymodal',
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );

    dealmodal.present();
  }
}
