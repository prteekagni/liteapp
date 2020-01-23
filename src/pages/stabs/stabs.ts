import { Component, ViewChild, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Content,
  Platform,
  Modal,
  ModalController,
  Refresher
} from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { SharedProvider } from "../../providers/shared/shared";
import { NotificationProvider } from "../../providers/notification/notification";
import { StorageProvider } from "../../providers/storage/storage";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
} from "@angular/animations";
@IonicPage()
@Component({
  selector: "page-stabs",
  templateUrl: "stabs.html",
  animations: [
    trigger("photosAnimation", [
      transition(":enter", [
        query(".dealslist", style({ transform: "translateX(-100%)" }), {
          optional: true
        }),
        query(
          ".dealslist",
          stagger("300ms", [
            animate("500ms", style({ transform: "translateX(0)" }))
          ]),
          { optional: true }
        )
      ])
    ]),
    trigger("btnanimation", [
      transition("more => less", [
        query(
          ":self",
          animate(
            "1s",
            keyframes([
              style({ transform: "translateY(0) rotate(0)" }),
              style({ transform: "translateY(-5px) rotate(1deg)" }),
              style({ transform: "translateY(0px) rotate(-1deg)" }),
              style({ transform: "translateY(-9px) rotate(3.2deg)" }),
              style({ transform: "translateY(5px) rotate(-2.4deg)" }),
              style({ transform: " translateY(-6px) rotate(1.2deg)" }),
              style({ transform: "translateY(0) rotate(0)" })
            ])
          )
        )
      ]),
      transition("less => more", [
        query(
          ":self",
          animate(
            "1s",
            keyframes([
              style({ transform: "translateY(0) rotate(0)" }),
              style({ transform: "translateY(-5px) rotate(1deg)" }),
              style({ transform: "translateY(0px) rotate(-1deg)" }),
              style({ transform: "translateY(-9px) rotate(1.2deg)" }),
              style({ transform: "translateY(5px) rotate(-1.4deg)" }),
              style({ transform: " translateY(-6px) rotate(1.2deg)" }),
              style({ transform: "translateY(0) rotate(0)" })
            ])
          )
        )
      ])
    ])
  ]
})
export class StabsPage implements OnInit {
  @ViewChild("SwipedTabsSlider") SwipedTabsSlider: Slides;
  @ViewChild("MultiItemsScrollingTabs") ItemsTitles: Content;
  @ViewChild("refresher") refresher: Refresher;
  dealcard = "more";
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
  clickanm = "active";
  pageCount = 1;
  pageNumber = 1;
  isloading: boolean = false;
  btnstate: string = "more";
  isrefresherloading: boolean = false;
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

    this.dealService
      .getDealBySubCategory(this.data.ID)
      .subscribe((res: any) => {
        res.forEach(element => {
          this.tabs.push(element);
        });
      });
    this.dealService
      .getDealsByCategory(this.data.ID, this.pageNumber)
      .subscribe((res: any) => {
        this.alldeals = res.data;
        this.pageCount = 1;
        console.log(res);
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
  }

  scrollIndicatiorTab(data) {
    this.pageCount = 1;
    this.pageNumber = 1;
    console.log("Scroll indicator method called");
    console.log(this.refresher);

    if (this.SwipedTabsSlider.realIndex === 0) {
      console.log(this.SwipedTabsSlider.realIndex);

      this.dealService
        .getDealsByCategory(this.data.ID, this.pageCount)
        .subscribe((res: any) => {
          this.alldeals = res.data;
          this.pageCount = 1;
          this.pageNumber = res.pageNumber;
          this.checkForFavourite(this.alldeals);
        });
    } else {
        this.ItemsTitles.scrollTo(
          this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) -
            this.screenWidth_px / 2,
          0
        ).then(res=>{
             this.dealService
               .getDealsBySubCategory(
                 this.tabs[this.SwipedTabsSlider.realIndex].ID,
                 this.pageCount
               )
               .subscribe((res: any) => {
                 this.newItem = res.data;
                 this.pageCount = res.totalPages;
                 this.pageNumber = res.pageNumber;
                 console.log(res);
                 this.checkForFavourite(this.newItem);
               });
        });
      // this.dealService
      //   .getDealsBySubCategory(
      //     this.tabs[this.SwipedTabsSlider.realIndex].ID,
      //     this.pageCount
      //   )
      //   .subscribe((res: any) => {
      //     this.newItem = res.data;
      //     this.pageCount = res.totalPages;
      //     this.pageNumber = res.pageNumber;
      //     console.log(res);
      //     this.checkForFavourite(this.newItem);
      //   });
    }

  
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.width =
      this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform =
      "translate3d(" + this.calculateDistanceToSpnd(index) + "px,0,0)";
    // this.SwipedTabsIndicator.style.left = 4 + "px";
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
    // if (this.SwipedTabsSlider.realIndex == 0) {
    //   this.SwipedTabsIndicator.style.left = 4 + "px";
    // } else {
    //   this.SwipedTabsIndicator.style.left = 0 + "px";
    // }
    this.SwipedTabsIndicator.style.webkitTransform =
      "translate3d(" + this.calculateDistanceToSpnd(index) + "px,0,0)";
  }

  updateIndicatorPositionOnTouchEnd() {
    setTimeout(() => {
      this.updateIndicatorPosition("a");
    }, 300);
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
        this.sharedService.createToast("Deals saved!");
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
    console.log("Before change" + element.state);
    element.state = element.state == "more" ? "less" : "more";
    this.clickanm = "inactive";
    console.log("After Change" + element.state);
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
        console.log(res);

        data.forEach(element => {
          // if (res.ID == element.ID) {
          //   element.itemfav = true;
          // }
          if (res.find(x => x.ID === element.ID)) {
            element.itemfav = true;
          }
        });

        console.log(data);
      }
    });
  }

  doInfinite(refresher) {
    console.log(refresher);
    if (refresher.state == "loading")
      if (this.pageCount !== 0) {
        if (this.SwipedTabsSlider.realIndex !== 0) {
          console.log("Swipe Index " + this.SwipedTabsSlider.realIndex);

          this.dealService
            .getDealsBySubCategory(
              this.tabs[this.SwipedTabsSlider.realIndex].ID,
              this.pageNumber + 1
            )
            .subscribe((res: any) => {
              console.log(res);

              res.data.forEach(element => {
                this.newItem.push(element);
              });
              this.pageNumber = res.pageNumber;
              this.pageCount--;
              refresher.complete();
            });
          this.checkForFavourite(this.newItem);
        } else {
          console.log("Swipe Index " + this.SwipedTabsSlider.realIndex);
          console.log("pageNumber is" + this.pageNumber);

          this.dealService
            .getDealsByCategory(this.data.ID, this.pageNumber + 1)
            .subscribe((res: any) => {
              console.log(res);

              res.data.forEach(element => {
                this.alldeals.push(element);
              });
              this.pageNumber = res.pageNumber;
              this.pageCount--;
              refresher.complete();
            });
          this.checkForFavourite(this.alldeals);
        }
      }
  }
  loadMore(data) {
    this.btnstate = this.btnstate == "less" ? "more" : "less";
    this.isloading = this.isloading == true ? true : false;
    if (data == "alldeals") {
      if (this.pageCount !== 0) {
        console.log("Swipe Index " + this.SwipedTabsSlider.realIndex);
        setTimeout(() => {
            this.dealService
              .getDealsByCategory(this.data.ID, this.pageNumber + 1)
              .subscribe((res: any) => {
                console.log(res);

                res.data.forEach(element => {
                  this.alldeals.push(element);
                });
                this.pageNumber = res.pageNumber;
                this.pageCount--;
              });
        }, 500);
        
      
        this.checkForFavourite(this.alldeals);
      }
    } else {
      this.dealService
        .getDealsBySubCategory(
          this.tabs[this.SwipedTabsSlider.realIndex].ID,
          this.pageNumber + 1
        )
        .subscribe((res: any) => {
          console.log(res);

          res.data.forEach(element => {
            this.newItem.push(element);
          });
          this.pageNumber = res.pageNumber;
          this.pageCount--;
          
        });
      this.checkForFavourite(this.newItem);
    }

    setTimeout(() => {
       this.isloading = this.isloading == true ? true : false;
    }, 1000);
  }
}
