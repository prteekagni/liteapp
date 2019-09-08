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
import { map } from "rxjs/operators";

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
      this.checkDirectory();
    });

    platform.resume.subscribe(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    });

    this.showToolbar = false;
    this.firebaseDynamicLinks
      .onDynamicLink()
      .subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );
  }

  ionViewDidLoad() {
    this.slides = [
      { image: "assets/bac.png" },
      { image: "http://elinfinitoindia.in/images/logo.png" }
    ];
  }

  nav11() {
    this.navCtrl.push("ProductlistPage");
  }

  ionViewWillEnter() {
    // this.dealService
    //   .getStoreLinks()
    //   .pipe(map((res: any) => res.filter(resp => resp.StoreType == "1")))
    //   .subscribe((res: any) => {
    //     this.store = res;
    //     console.log(res);
    //   });

    this.http.get("http://localhost:3000/dolphins").subscribe((res: any) => {
      this.store = res;
    });

    this.imgpath = localStorage.getItem("key") || "";
    this.events.subscribe("nstatus", res => {
      if (res == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });

    this.dealService.getAdsData().subscribe(
      res => {
        this.adsData = res || [];
        if (this.adsData.length > 0) {
          this.mainslide = this.adsData.filter(x => x.category == "scroll");
        }
      },
      err => {
        console.log(err);
      }
    );
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
    setTimeout(() => {
      event.complete();
    }, 1000);
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
