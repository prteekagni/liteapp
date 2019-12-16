import { Component, ViewChild, OnInit } from "@angular/core";
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
export class ProductlistPage implements OnInit {
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
  type;
  clickoncard: boolean = false;
  id;
  searchterm;
  constructor(
    public navParams: NavParams,
    private storageService: StorageProvider,
    private toastController: ToastController,
    private notificationService: NotificationProvider,
    public alertCtrl: AlertController,
    public sharedService: SharedProvider,
    private modalController: ModalController,
    private dealService: DealsProvider,
    private navCtrl: NavController
  ) {
    
  }

  ngOnInit(): void {
    this.id = this.navParams.get("id");
    this.type = this.navParams.get("type");
    console.log("From Product List page " + this.type);
   
    if (this.type == "deals" && this.id.ID) {
      this.dealService.getDealsByCategory(this.id.ID).subscribe((res: any) => {
        this.newItem = res;
        // this.checkForFavourite(this.newItem);
      });
    } 
    if(this.type == "services" && this.id.ID) {
      this.dealService.getProductByCategory(this.id).subscribe((res: any) => {
        this.newItem = res;
      });
    } 
    if(this.type == "history"){
      this.storageService.getVisitedDeals().then((res:any)=>{
        this.newItem = res;
        console.log("From history " + res);
      }, err=>{
        this.sharedService.createToast("Unable to get history.");
      })
      
    }
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
    this._content.scrollToTop().then(
      res => console.log(res),
      err => console.warn(err)
    );
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
          this.sharedService.createToast("Reminder Updated");
        } else {
          this.sharedService.createToast("Reminder Scheduled");
        }
      });
    });
  }

  setAsFav(data) {
    this.sharedService.addToFavEventTrack(data);
    this.storageService.addDeals(data).then(res => {
      if (res == true) {
        this.sharedService.createToast("Deal added to favourite");
        this.sharedService.firebaseevent("DealAddedToFav",data.Name)
      } else {
        this.sharedService.createToast("Deal already present");
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

  shareApp() {
    this.sharedService.shareapplication();
  }

  checkForFavourite(data) {
    this.storageService.getDeals().then((res: any) => {
      if (res) {
        this.newItem.forEach(element => {
          if (res.ID == element.ID) {
            this.newItem.itemfav = true;
          }
        });
      }
    });
  }

  cardClick(item) {
    // this.clickoncard = !this.clickoncard;
    console.log(item);
    this.navCtrl.push("DealdetailPage", {
      data: item,
      type: "services"
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete;
    }, 1000);
  }
}
