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
  AlertController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Events } from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { Subject } from "rxjs";
/**
 * Generated class for the DealsgridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "dealsgrid",
  templateUrl: "dealsgrid.html"
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
    private http: HttpClient,
    private event: Events,
    private modalController: ModalController,
    private viewController: ViewController,
    private navCtrl: NavController,
    private storage: Storage,
    private sharedService: SharedProvider,
    private file: File,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.copyItem = this.items;

    if (this.type === "deals") {
      this.dealService
        .getDealSubCategory(this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    } else if (this.type == "substores") {
      this.dealService
        .getSubStores(this.items.CatPID, this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    } else if (this.type == "stores") {
      this.dealService.storesdata.subscribe((res: any) => {
        this.data1 = res;
        this.data1.forEach(element => {
          if (element.CategoryID == this.items.ID) {
            this.cards.push(element);
          }
        });
        if(this.cards.length !== 0) {
        if (
          (this.cards.length > 1 && this.cards[0].StoreType == 1) ||
          this.cards[0].StoreType == 6
        ) {
          this.directLinks = true;
        }
        this.copiedData = this.cards;
      }});
    

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
    } else if (this.type == "products") {
      this.dealService.getProductCategory().subscribe((res: any) => {
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
  getOfferDetail(data) {
    if (this.type == "stores") {
      const alert = this.alertController.create({
        title: "Redirecting",
        subTitle: "Redirecting to the store website!",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.navCtrl.push("ProductlistPage", {
        id: data,
        type: "deals"
      });
    }
  }
}
