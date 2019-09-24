import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Platform,
  ModalController,
  Content,
  Slides
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ScrollHideConfig } from "../../directives/scroll/scroll";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { DealsProvider } from "../../providers/deals/deals";
import { HttpClient } from "@angular/common/http";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { normalizeURL } from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { map, take } from "rxjs/operators";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

const animationsOptions = {
  animation: "ios-transition",
  duration: 1000
};

const myimages = [
  {
    name: "First",
    path: "https://appimageselinfinito.s3.us-east-2.amazonaws.com/Ajio.png"
  },
  {
    name: "Second",
    path: "https://appimageselinfinito.s3.us-east-2.amazonaws.com/facebook.png"
  }
];

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 44
  };

  @ViewChild(Slides) slides1: Slides;
  @ViewChild(Content) content: Content;
  slides;
  isLoggedIn: boolean = false;
  lnotification: any = [];
  isConnected: boolean;
  showToolbar: boolean;
  visibility: boolean = true;
  counter: any = 0;
  stores: any = [];
  storelinks;
  defaultImage = "../../assets/images/logo.png";
  page: number = 1;
  catego: any = [];
  adsData: any = [];
  mainslide: any = [];
  brands: any = [];
  imgpath: any;
  counts: any = [];
  images: any = [];
  store: any = [];
  showMore: boolean = true;
  items: any = [];
  tempStore: any = [];
  substores: any = [];
  tempSubStores: any = [];
  lastStore: boolean = false;
  fileTransfer;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private sharedService: SharedProvider,
    private modalController: ModalController,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private dealService: DealsProvider,
    private http: HttpClient,
    private transfer: FileTransfer,
    private file: File,
    private storage: StorageProvider
  ) {
    platform.ready().then(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
      // this.checkDirectory();
    });

    platform.resume.subscribe(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    });

    this.showToolbar = false;

    // On Click of dynamic Link
    this.firebaseDynamicLinks
      .onDynamicLink()
      .subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );

    // this.http
    //   .get("http://192.168.225.36:52044/api/category/getProductCategory")
    //   .subscribe((res: any) => {
    //     this.tempStore = res;
    //     for (var i = 0; i < 3; i++) {
    //       this.items.push(res[i]);
    //     }
    //   });
    // store category
    this.dealService
      .getStoreCategory()
      .pipe(take(5))
      .subscribe((res: any) => {
        this.tempStore = res;
        // console.log(" Get Store Category " + this.tempStore);
        for (let index = 0; index < 4; index++) {
          this.store.push(res[index]);
        }
      });

    this.dealService
      .getStoreSubCategory("59378531-62f7-4cdd-af59-cfcfbb0d91f0")
      .subscribe((res: any) => {
        this.tempSubStores = res;
        for (let index = 0; index < 3; index++) {
          this.substores.push(this.tempSubStores[index]);
        }
        //   for (let index = 0; index < this.tempSubStores.length; ) {
        //     if (this.tempSubStores[index].Logo) {
        //       this.download(
        //         this.tempSubStores[index].Name,
        //         "http://elinfinitoindia.in/images/logo.png"
        //       ).then(
        //         (res: any) => {
        //           console.log(res);
        //         },
        //         err => {
        //           console.log(JSON.stringify(err));
        //           index++;
        //         }
        //       );
        //     }
        //   }
      });
    // console.log("Hello  " + res);

    // this.dealService.getStoreCategory().subscribe(
    //   (res: any) => {
    //     console.log("GET store" + res);
    //   },
    //   err => {
    //     console.warn(err);
    //   }
    // );
  }

  ionViewDidLoad() {
    this.slides = [
      { image: "assets/bac.png" },
      { image: "http://elinfinitoindia.in/images/logo.png" }
    ];
  }

  download(fileName, filePath): Promise<any> {
    //here encoding path as encodeURI() format.
    fileName = fileName + ".png";
    filePath =
      "https://appimageselinfinito.s3.us-east-2.amazonaws.com/" + filePath;
    let url = encodeURI(filePath);
    //here initializing object.
    this.fileTransfer = this.transfer.create();
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    return this.fileTransfer.download(
      url,
      this.file.externalDataDirectory + fileName,
      true
    );
    // .then(
    //   entry => {
    //     //here logging our success downloaded file path in mobile.
    //     // console.log("download completed: " + entry.toURL());
    //     // return entry.toUrl();
    //     var a = (<any>window).Ionic.WebView.convertFileSrc(entry.toURL());
    //     // return a;
    //   },
    //   error => {
    //     //here logging our error its easier to find out what type of error occured.
    //     // console.log("download failed: " + error);
    //     // return error;
    //   }
    // );
  }
  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {
    this.imgpath = localStorage.getItem("key") || "";
    this.events.subscribe("nstatus", res => {
      if (res == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });

    // this.dealService.getAdsData().subscribe(
    //   res => {
    //     this.adsData = res || [];
    //     if (this.adsData.length > 0) {
    //       this.mainslide = this.adsData.filter(x => x.category == "scroll");
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  goToNotification() {
    this.navCtrl.push("NotificationPage", {}, animationsOptions);
  }

  goToFav() {
    this.navCtrl.push("FavouritesPage", {}, animationsOptions);
  }

  toggle() {
    this.isConnected = !this.isConnected;
  }

  ionViewWillLeave() {}

  doInfinite(event) {
    if (this.store.length !== this.tempStore.length) {
      for (let index = 0; index < this.tempStore.length - 4; index++) {
        // console.log(this.tempStore[index + 4]);
        this.store.push(this.tempStore[index + 3]);
      }
      // event.complete();
    } else {
      // event.enable(false);
    }
    setTimeout(() => {
      event.complete();
    }, 1000);
    this.lastStore = true;
  }

  async toggleDisplay() {
    // if (this.tempSubStores.length !== this.substores.length) {
    //   for (
    //     var ii = this.substores.length;
    //     ii < this.tempSubStores.length;
    //     ii++
    //   ) {
    //     this.substores.push(this.tempSubStores[ii]);
    //   }
    // }

    let data = {
      Name: "Praetek",
      Links: [
        {
          Name: "Amazon",
          Logo: "Img",
          Linlk: "fldkjhglkjfhdgj"
        }
      ]
    };

    // this.showMore = !this.showMore;
    let dealmodal = this.modalController.create(
      "LinkmodalPage",
      { data: data },
      {
        cssClass: "mymodal",
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );

    return await dealmodal.present();
  }

  goToPage(data) {
    console.log(data);
    this.navCtrl.push("StorepagePage", {
      id: data.ID,
      type: "store"
    });
  }

  downloadOnMemory(data) {
    console.log(data);
    const fileTransfer: FileTransferObject = this.transfer.create();

    const url = encodeURI(data.path);
    const targetPath =
      this.file.externalDataDirectory + "Videos/" + data.name + ".png";
    fileTransfer.download(url, targetPath, true).then(
      entry => {
        // console.log(
        //   "download complete: " +
        //     (<any>window).Ionic.WebView.convertFileSrc(entry.toURL())
        // );
        var a = (<any>window).Ionic.WebView.convertFileSrc(entry.toURL());
        localStorage.setItem("key", a);
      },
      error => {
        console.log(error);
      }
    );
  }

  checkDirectory() {
    this.file
      .checkDir(this.file.externalDataDirectory, "Videos")
      .then((res: any) => {
        if (res) {
          console.log("Directory exists");
          myimages.forEach(element => {
            this.downloadOnMemory(element);
          });
        } else {
          this.file
            .createDir(this.file.externalDataDirectory, "Videos", false)
            .then(() => {
              console.log("Directory created successfully");
              myimages.forEach(element => {
                this.downloadOnMemory(element);
              });
            })
            .catch(() => {
              console.log("Failed to create directory");
            });
        }
      })
      .catch(err => console.log("Directory doesn't exist"));
  }

  // readFile() {
  //   this.file
  //     .listDir(this.file.externalDataDirectory, "Videos")
  //     .then(data => {
  //       console.log(data[0]);
  //       this.counts = data.length;
  //       const src = data[0].toInternalURL();
  //       this.file.resolveLocalFilesystemUrl(src).then(
  //         data => {
  //           this.imgpath = data.toURL();
  //           this.imgpath = (<any>window).Ionic.WebView.convertFileSrc(
  //             this.imgpath
  //           );
  //           // this.storage.addImages().then(
  //           //   res => {
  //           //     console.log("ho gaya");
  //           //   },
  //           //   err => {
  //           //     console.error("nahi hua");
  //           //   }
  //           // );
  //           console.log(this.imgpath);
  //         },
  //         error => {
  //           console.log("File path error");
  //         }
  //       );
  //     })
  //     .catch(err => console.log("Directory doesnt exist"));
  //   this.dealService.getDealsCategory().subscribe(res => {
  //     this.stores = res;
  //   });
  // }
}
