import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { StorageProvider } from "../../providers/storage/storage";
import { Storage } from "@ionic/storage";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";
@Component({
  selector: "cardslide",
  templateUrl: "cardslide.html"
})
export class CardslideComponent implements OnInit, AfterViewInit {
  cards: any = [];
  @Input() items;
  @Input() type;
  newMobileSlide;
  storelinks;
  copiedData: any = [];
  localData: any = [];
  clearData: any = [];

  constructor(
    private navCtrl: NavController,
    private dealService: DealsProvider,
    private modalController: ModalController,
    private storage: Storage,
    private sharedService: SharedProvider,
    private file: File
  ) {}

  ngOnInit() {
    if (this.type == "stores") {
      this.dealService.getStores(this.items.ID).subscribe((res: any) => {
        this.cards = res;
        this.copiedData = this.cards;

        for (let index = 0; index < this.copiedData.length; index++) {
          this.sharedService.checkDownloadedImage(this.copiedData[index]).then(
            res => {
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
                  .downloadOnMemory(this.copiedData[index],"stores")
                  .then(
                    (res: any) => {
                      console.log(res);
                      var a = (<any>window).Ionic.WebView.convertFileSrc(
                        res.toURL()
                      );
                      this.copiedData[index].Logo = a;

                      this.storage.get("images").then((res: any) => {
                        if (res) {
                          if (
                            res.find(x => x.ID === this.copiedData[index].ID)
                          ) {
                          } else {
                            res.push(this.copiedData[index]);
                            this.storage.set("images", res);
                          }
                        } else {
                          this.storage.set("images", this.copiedData[index]);
                        }
                      });
                    },
                    error => {
                      index++;
                      console.log(JSON.stringify(error));
                    }
                  );
              }
            },
            err => {
              this.sharedService.downloadOnMemory(this.copiedData[index] , "stores").then(
                (res: any) => {
                  console.log(res);
                  var a = (<any>window).Ionic.WebView.convertFileSrc(
                    res.toURL()
                  );
                  this.copiedData[index].Logo = a;

                  this.storage.get("images").then((res: any) => {
                    if (res) {
                      if (res.find(x => x.ID === this.copiedData[index].ID)) {
                      } else {
                        res.push(this.copiedData[index]);
                        this.storage.set("images", res);
                      }
                    } else {
                      this.storage.set("images", this.copiedData[index]);
                    }
                  });
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
    } else if (this.type == "deals") {
      this.dealService
        .getDealBySubCategory(this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
          for (let index = 0; index < this.cards.length; index++) {
            this.sharedService.checkDownloadedImage(this.cards[index]).then(
              res => {
                if (res) {
                  var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
                    this.file.externalDataDirectory +
                      "images/" +
                      this.cards[index].Name +
                      ".png"
                  );
                  console.log(nativeUrl);
                  if (nativeUrl.length > 0) {
                    this.cards[index].Logo = nativeUrl;
                  }
                } else {
                  this.sharedService
                    .downloadOnMemory(this.cards[index], "deals")
                    .then(
                      (res: any) => {
                        console.log(res);
                        var a = (<any>window).Ionic.WebView.convertFileSrc(
                          res.toURL()
                        );
                        this.cards[index].Logo = a;

                        this.storage.get("images").then((res: any) => {
                          if (res) {
                            if (
                              res.find(x => x.ID === this.copiedData[index].ID)
                            ) {
                            } else {
                              res.push(this.copiedData[index]);
                              this.storage.set("images", res);
                            }
                          } else {
                            this.storage.set("images", this.copiedData[index]);
                          }
                        });
                      },
                      error => {
                        index++;
                        console.log(JSON.stringify(error));
                      }
                    );
                }
              },
              error => {
                this.sharedService
                  .downloadOnMemory(this.copiedData[index] ,"deals")
                  .then((res: any) => {
                    console.log(res);
                    var a = (<any>window).Ionic.WebView.convertFileSrc(
                      res.toURL()
                    );
                    this.copiedData[index].Logo = a;

                    this.storage.get("images").then((res: any) => {
                      if (res) {
                        if (res.find(x => x.ID === this.copiedData[index].ID)) {
                        } else {
                          res.push(this.copiedData[index]);
                          this.storage.set("images", res);
                        }
                      } else {
                        this.storage.set("images", this.copiedData[index]);
                      }
                    });
                  });
              }
            );
          }
        });
    }
  }

  ngAfterViewInit(): void {}

  getToDeal(item) {
    if (this.type == "stores") {
      let modal = this.modalController.create(
        "LinkmodalPage",
        {
          data: item
        },
        {
          cssClass: "mymodal"
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
}
