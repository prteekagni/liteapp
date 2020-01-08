import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";
import {
  Content,
  ModalController,
  ViewController,
  NavController,
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from "@angular/animations";
@Component({
  selector: "dealsgrid",
  templateUrl: "dealsgrid.html",
  animations: [
    trigger("photosAnimation", [
      transition("* => *", [
        query(".dealslist", style({ transform: "translateX(-100%)" }), {
          optional: true
        }),
        query(
          ".dealslist",
          stagger("600ms", [
            animate("900ms", style({ transform: "translateX(0)" }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class DealsgridComponent implements OnInit {
  text: string;
  cards: any = [];
  @Input() items: any;
  @Input() type: any;
  @Output() data = new EventEmitter();
  copyItem: any;
  directLinks: boolean = false;
  @ViewChild(Content) content: Content;
  allstores: any = [];
  copiedData: any = [];
  data1: any = [];
  constructor(
    private dealService: DealsProvider,
    private modalController: ModalController,
    private viewController: ViewController,
    private navCtrl: NavController,
    private sharedService: SharedProvider,
    private file: File
  ) {}

  ngOnInit() {
    this.copyItem = this.items;

    if (this.type === "deals" && this.items.ID) {
      this.dealService
        .getDealBySubCategory(this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
          for (let index = 0; index < this.cards.length; index++) {
            this.sharedService
              .checkDownloadedImage(this.cards[index], this.type)
              .then(
                res => {
                  if (res) {
                    var dataName =
                      this.cards[index].Name +
                      this.cards[index].ID.substring(0, 5);
                    var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
                      this.file.externalDataDirectory +
                        "images/" +
                        dataName +
                        ".png"
                    );
                    if (nativeUrl.length > 0) {
                      this.cards[index].Logo = nativeUrl;
                    }
                  } else {
                    this.sharedService
                      .downloadOnMemory(this.cards[index], this.type)
                      .then((res: any) => {
                        console.log(res);
                        var a = (<any>window).Ionic.WebView.convertFileSrc(
                          res.toURL()
                        );
                        this.cards[index].Logo = a;
                      });
                  }
                },
                err => {
                  this.sharedService
                    .downloadOnMemory(this.cards[index], this.type)
                    .then(
                      (res: any) => {
                        console.log(res);
                        var a = (<any>window).Ionic.WebView.convertFileSrc(
                          res.toURL()
                        );
                        this.cards[index].Logo = a;
                      },
                      error => {
                        index++;
                        console.log(JSON.stringify(error));
                      }
                    );
                }
              );
          }
        });
    } else if (this.type == "substores") {
      this.dealService
        .getSubStores(this.items.CatPID, this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
         console.log(this.cards);
         
        });
    } else if (this.type == "stores") {
      this.dealService.storesdata.subscribe((res: any) => {
        this.data1 = res;
        this.data1.forEach(element => {
          if (element.CategoryID == this.items.ID) {
            this.cards.push(element);
          }
        });
        
        if (this.cards.length !== 0) {
          if (
            (this.cards.length > 1 && this.cards[0].StoreType == 1) ||
            this.cards[0].StoreType == 6
          ) {
            this.directLinks = true;
          }
          else{ if(this.cards[0].StoreType == 2 && this.cards[0].CategoryID !== null && this.type == "stores"){
              console.log(this.cards);
              this.directLinks = true;
              
            }
          }
          this.copiedData = this.cards;
        }
      });
      for (let index = 0; index < this.copiedData.length; index++) {
        this.sharedService
          .checkDownloadedImage(this.copiedData[index], this.type)
          .then(
            res => {
              console.log(res);

              if (res) {
                var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
                  this.file.externalDataDirectory +
                    "images/" +
                    this.copiedData[index].Name +
                    ".png"
                );
                console.log(nativeUrl);
                if (nativeUrl.length > 0) {
                  this.copiedData[index].Logo = nativeUrl;
                }
              } else {
                this.sharedService
                  .downloadOnMemory(this.copiedData[index], this.type)
                  .then((res: any) => {
                    console.log(res);
                    var a = (<any>window).Ionic.WebView.convertFileSrc(
                      res.toURL()
                    );
                    this.copiedData[index].Logo = a;
                  });
              }
            },
            err => {
              this.sharedService
                .downloadOnMemory(this.copiedData[index], this.type)
                .then(
                  (res: any) => {
                    console.log(res);
                    var a = (<any>window).Ionic.WebView.convertFileSrc(
                      res.toURL()
                    );
                    this.copiedData[index].Logo = a;
                  },
                  error => {
                    index++;
                    console.log(JSON.stringify(error));
                  }
                );
            }
          );
      }
    } else if (this.type == "products") {
      this.dealService
        .getStoreSubCategory(this.copyItem.ID)
        .subscribe((res: any) => {
          this.cards = res;
          console.log(this.cards);
        });
    }

    // this.dealService.getStores(this.items.ID).subscribe((res: any) => {
    //   this.cards = res;
    //   this.copiedData = this.cards;
    //   console.log(this.cards[0]);
    //   if (
    //     (this.cards.length > 1 && this.cards[0].StoreType == 1) ||
    //     this.cards[0].StoreType == 6
    //   ) {
    //     this.directLinks = true;
    //   }
    //   for (let index = 0; index < this.copiedData.length; index++) {
    //     this.sharedService.checkDownloadedImage(this.copiedData[index]).then(
    //       res => {
    //         if (res) {
    //           var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
    //             this.file.externalDataDirectory +
    //               "images/" +
    //               this.copiedData[index].Name +
    //               ".png"
    //           );
    //           console.log(nativeUrl);
    //           if (nativeUrl.length > 0) {
    //             this.copiedData[index].Logo = nativeUrl;
    //           }
    //         } else {
    //           this.sharedService
    //             .downloadOnMemory(this.copiedData[index])
    //             .then(
    //               (res: any) => {
    //                 console.log(res);
    //                 var a = (<any>window).Ionic.WebView.convertFileSrc(
    //                   res.toURL()
    //                 );
    //                 this.copiedData[index].Logo = a;

    //                 // this.storage.get("images").then((res: any) => {
    //                 //   if (res) {
    //                 //     if (
    //                 //       res.find(x => x.ID === this.copiedData[index].ID)
    //                 //     ) {
    //                 //     } else {
    //                 //       res.push(this.copiedData[index]);
    //                 //       this.storage.set("images", res);
    //                 //     }
    //                 //   } else {
    //                 //     this.storage.set("images", this.copiedData[index]);
    //                 //   }
    //                 // });
    //               },
    //               error => {
    //                 index++;
    //                 console.log(JSON.stringify(error));
    //               }
    //             );
    //         }
    //       },
    //       err => {
    //         this.sharedService.downloadOnMemory(this.copiedData[index]).then(
    //           (res: any) => {
    //             console.log(res);
    //             var a = (<any>window).Ionic.WebView.convertFileSrc(
    //               res.toURL()
    //             );
    //             this.copiedData[index].Logo = a;

    //             // this.storage.get("images").then((res: any) => {
    //             //   if (res) {
    //             //     if (res.find(x => x.ID === this.copiedData[index].ID)) {
    //             //     } else {
    //             //       res.push(this.copiedData[index]);
    //             //       this.storage.set("images", res);
    //             //     }
    //             //   } else {
    //             //     this.storage.set("images", this.copiedData[index]);
    //             //   }
    //             // });
    //           },
    //           error => {
    //             index++;
    //             console.log(JSON.stringify(error));
    //           }
    //         );
    //       }
    //     );
    //   }
    // });
    else if (this.type == "products") {
      console.log("In Products Section");

      this.dealService
        .getProductSubCategory(this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    }
  }

  goToStore(item) {
    let modal = this.modalController.create(
      "WaitmodalPage",
      {
        data: item
      },
      {
        cssClass: "linkmodal"
      }
    );
    modal.present();
  }

  dismiss() {
    this.viewController.dismiss();
  }
  getToDeal(item) {
    if (this.type == "stores" || this.type == "substores") {
      let modal = this.modalController.create(
        "LinkmodalPage",
        {
          data: item
        },
        {
          cssClass: "my-modal",
          showBackdrop: true,
          enableBackdropDismiss: true
        }
      );
      modal.present();
    } else if (this.type == "deals") {
      this.navCtrl.push("ProductlistPage", {
        type: this.type,
        id: item
      });
    }
  }
  getOfferDetail(data) {
    console.log(this.type);
    if (this.type == "stores" || this.type == "substores") {
      console.log(data);
      let modal = this.modalController.create(
        "LinkmodalPage",
        {
          data: data
        },
        {
          cssClass: "my-modal",
          showBackdrop: true,
          enableBackdropDismiss: true
        }
      );
      modal.present();
    } else {
      this.navCtrl.push("ProductlistPage", {
        id: data,
        type: "deals"
      });
    }
  }

  getToServices(data) {
    this.navCtrl.push("ProductlistPage", {
      id: data,
      type: "services"
    });
  }

  touchstart(data) {
    console.log(data);
  }
}
