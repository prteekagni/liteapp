import { Component, ViewChild, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Content,
  Platform,
  Modal,
  ModalController
} from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { SharedProvider } from "../../providers/shared/shared";
import { NotificationProvider } from "../../providers/notification/notification";
import { StorageProvider } from "../../providers/storage/storage";

@IonicPage()
@Component({
  selector: "page-stabs",
  templateUrl: "stabs.html"
})
export class StabsPage implements OnInit {
  @ViewChild("SwipedTabsSlider") SwipedTabsSlider: Slides;
  @ViewChild("MultiItemsScrollingTabs") ItemsTitles: Content;

  SwipedTabsIndicator: any = null;
  tabTitleWidthArray: any = [];
  tabElementWidth_px: number = 50;
  screenWidth_px: number = 0;
  isRight: boolean = true;
  isLeft: boolean = true;
  tabs: any = [];
  items;
  newItem;
  data;
  title: string;
  alldeals: any = [];

  constructor(
    public navCtrl: NavController,
    platform: Platform,
    private dealService: DealsProvider,
    private navParams: NavParams,
    private sharedService: SharedProvider,
    private notificationService: NotificationProvider,
    private storageService: StorageProvider,
    private modalController: ModalController
  ) {
    this.screenWidth_px = platform.width();
  }

  ngOnInit(): void {
    this.data = this.navParams.get("data");
    this.title = this.data.Name;
    this.tabs.splice(0, 0, this.data);
    
 this.dealService.getDealBySubCategory(this.data.ID).subscribe((res: any) => {
   res.forEach(element => {
     this.tabs.push(element)
   });
 });
    this.dealService.getDealsByCategory(this.data.ID).subscribe((res: any) => {
      this.alldeals = res;
       this.checkForFavourite(this.alldeals);
    });
  }
 
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    if (this.tabs.length !== 0) {
      for (let i in this.tabs)
        this.tabTitleWidthArray.push(
          document.getElementById("tabTitle" + i).offsetWidth
        );
         this.selectTab(0);
    }
   
    if (this.tabs.length !== 0) {
      this.dealService
        .getDealsBySubCategory(this.tabs[0].ID)
        .subscribe((res: any) => {
          this.newItem = res;
        });
    }
  }

  scrollIndicatiorTab(data) {
    this.ItemsTitles.scrollTo(
      this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) -
        this.screenWidth_px / 2,
      0
    );
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.width =
      this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform =
      "translate3d(" + this.calculateDistanceToSpnd(index) + "px,0,0)";
    this.SwipedTabsSlider.slideTo(index);
  }

  calculateDistanceToSpnd(index) {
    var result = 0;
    for (var _i = 0; _i < index; _i++) {
      result = result + this.tabTitleWidthArray[_i];
    }
    return result;
  }

  updateIndicatorPosition(data) {
    var index = this.SwipedTabsSlider.getActiveIndex();
    if (this.SwipedTabsSlider.length() == index) index = index - 1;

    this.SwipedTabsIndicator.style.width =
      this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform =
      "translate3d(" + this.calculateDistanceToSpnd(index) + "px,0,0)";
    this.dealService
      .getDealsBySubCategory(this.tabs[this.SwipedTabsSlider.realIndex].ID)
      .subscribe((res: any) => {
        this.newItem = res;
      });
  }

  updateIndicatorPositionOnTouchEnd() {
    setTimeout(() => {
      this.updateIndicatorPosition("a");
    }, 200);
  }

  animateIndicator($event) {
    this.isLeft = false;
    this.isRight = false;
    var currentSliderCenterProgress =
      (1 / (this.SwipedTabsSlider.length() - 1)) *
      this.SwipedTabsSlider.getActiveIndex();
    if ($event.progress < currentSliderCenterProgress) {
      this.isLeft = true;
      this.isRight = false;
    }
    if ($event.progress > currentSliderCenterProgress) {
      this.isLeft = false;
      this.isRight = true;
    }

    if (this.SwipedTabsSlider.isEnd()) this.isRight = false;

    if (this.SwipedTabsSlider.isBeginning()) this.isLeft = false;

    if (this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
        "translate3d(" +
        (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) +
          ($event.progress - currentSliderCenterProgress) *
            (this.SwipedTabsSlider.length() - 1) *
            this.tabTitleWidthArray[
              this.SwipedTabsSlider.getActiveIndex() + 1
            ]) +
        "px,0,0)";

    if (this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
        "translate3d(" +
        (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) +
          ($event.progress - currentSliderCenterProgress) *
            (this.SwipedTabsSlider.length() - 1) *
            this.tabTitleWidthArray[
              this.SwipedTabsSlider.getActiveIndex() - 1
            ]) +
        "px,0,0)";

    if (!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width =
        this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()] + "px";
  }

  setDealAsFav(element) {
    this.storageService.addDeals(element).then(res => {
      if (res == true) {
        this.sharedService.createToast("Item added!");
        this.newItem
          .filter(f => {
            return f.id == element.id;
          })
          .map(m => {
            m.isMatched = true;
          });
      } else {
        this.sharedService.createToast("Already in the list");
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
      } else {
        this.sharedService.createToast("Deal already present");
      }
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

  shareApp() {
    this.sharedService.shareapplication();
  }
  checkForFavourite(data) {
    this.storageService.getDeals().then((res: any) => {
      if (res) {
        this.alldeals.forEach(element => {
          if (res.ID == element.ID) {
            this.alldeals.itemfav = true;
          }
        });
      }
    });
  }

  doInfinite(refresher) {}
}
