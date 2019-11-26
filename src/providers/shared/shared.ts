import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController, Events } from "ionic-angular";

import { Network } from "@ionic-native/network";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import {
  InAppBrowser,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { Subject } from "rxjs";
import { of } from "rxjs/observable/of";
import { StatusBar } from "@ionic-native/status-bar";
import { SocialSharing } from "@ionic-native/social-sharing";
import { BrowserTab } from "@ionic-native/browser-tab";

declare var cordova: any;

let options: NativeTransitionOptions = {
  direction: "up",
  duration: 500,
  slowdownfactor: 3,
  slidePixels: 20,
  iosdelay: 100,
  androiddelay: 150,
  fixedPixelsTop: 0,
  fixedPixelsBottom: 60
};

let browserOptions: InAppBrowserOptions = {
  location: "no"
};

declare var window: { KochavaTracker };

@Injectable()
export class SharedProvider {
  loading;

  browserOpenSubject = new Subject<boolean>();

  constructor(
    private loadingCtrl: LoadingController,

    private toastCtrl: ToastController,
    private network: Network,
    private events: Events,
    private nativeTrasnitions: NativePageTransitions,
    private file: File,
    private transfer: FileTransfer,
    private inappBrowser: InAppBrowser,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing,
    private browserTab: BrowserTab
  ) {
    this.checkNetworkStatusOnPage();
  }

  createToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      position: "top",
      duration: 3000
    });
    toast.present();
  }

  createLoader() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="../../assets/loader_icon.svg"/>
      `
        // dismissOnPageChange: true
      });
      this.loading.present();
    }
  }

  dismissLoader() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  saveUser(user) {
    localStorage.setItem("User", JSON.stringify(user));
  }

  saveToken(token) {
    localStorage.setItem("Token", token);
  }

  getUser() {
    return localStorage.getItem("User");
  }

  checkToken() {
    return localStorage.getItem("Token");
  }

  shareapplication() {
    this.createLoader;
    var message =
      "All Deals at one place, lock your deals with the deals locker app. Download Now!!";
    this.socialSharing
      .share(
        message,
        "",
        "assets/levis.jpg",
        "https://play.google.com/store/apps/details?id=io.palianews.app&hl=en"
      )
      .then(
        (res: any) => {
          this.dismissLoader();
        },
        err => {
          this.dismissLoader();
        }
      );
  }

  isConnected() {
    let conntype = this.network.type;
    return conntype;
  }

  checkNetworkStatus() {
    let conntype = this.network.type;

    if (conntype === "NONE" || conntype === "none") {
      return of(false);
    } else {
      return of(true);
    }
  }

  intializeTracker() {
    var configMapObject = {};
    configMapObject[window.KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] =
      "kodeals-locker-lite-lnfe1m8y";
    window.KochavaTracker.configure(configMapObject);
  }

  registerEventTrack() {
    var eventMapObject = {};
    eventMapObject["name"] = "Registration";
    eventMapObject["user_id"] = "Prateek";
    window.KochavaTracker.sendEventMapObject(
      window.KochavaTracker.EVENT_TYPE_REGISTRATION_COMPLETE_STRING_KEY,
      eventMapObject
    );
  }

  addToFavEventTrack(data) {
    var eventMapObject = {};
    eventMapObject["name"] = "addToWishList";
    eventMapObject["id"] = data.id;
    eventMapObject["title"] = data.title;
    window.KochavaTracker.sendEventMapObject(
      window.KochavaTracker.EVENT_TYPE_ADD_TO_WISHLIST_STRING_KEY,
      eventMapObject
    );
  }

  nativeSlide() {
    this.nativeTrasnitions
      .slide(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  nativeFlip() {
    this.nativeTrasnitions.flip(options).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  nativeFade() {
    this.nativeTrasnitions.fade(options).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  handleError(error) {
    // alert(JSON.stringify(error));
    this.createToast(error.statusText);
  }

  // createBrowserLink

  openBrowser(data) {
    var url;
    var temp = Array.isArray(data.Url) ? true : false;
    if (temp) {
      if (data.Url.length <= 1 && data.Url.length !== 0) {
        url = data.Url[0].Url;
        console.log(url);
        // const browser = this.inappBrowser.create(url, "_system", {
        //   location: "yes",
        //   fullscreen: "yes"
        // });
        this.browserTab.isAvailable().then(isAvailable => {
          if (isAvailable) {
            this.browserTab.openUrl(url);
          } else {
            const browser = this.inappBrowser.create(url, "_system", {
          location: "yes",
          fullscreen: "yes"
        });
          }
        });
      } else if (data.Url.length == 0) {
        this.createToast("Error");
      }
    } else {
      // const browser = this.inappBrowser.create(data.Url, "_system", {
      //   location: "yes",
      //   fullscreen: "yes"
      // });
      this.browserTab.isAvailable().then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(data.Url);
        } else {
          const browser = this.inappBrowser.create(data.Url, "_system", {
            location: "yes",
            fullscreen: "yes"
          });
        }
      });
      //      browser.on("loadstart").subscribe(event=>{
      //  this.statusBar.styleLightContent();
      //  this.statusBar.overlaysWebView(false);
      //  this.statusBar.backgroundColorByHexString("#ff4500");
      //      })
    }
    // browser.on("loadstart").subscribe(event => {
    //   console.log(event);
    //   this.browserOpenSubject.next(true);
    // });
  }

  downloadOnMemory(data, type) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = encodeURI(data.Logo);
    if (type == "deals") {
      var imagePath = data.Name + data.ID.substring(0, 5);
    } else {
      var imagePath = data.Name;
    }
    const targetPath =
      this.file.externalDataDirectory + "images/" + imagePath + ".png";
    return fileTransfer.download(url, targetPath, true);
  }

  checkDownloadedImage(data, type): Promise<string> {
    if (type == "deals") {
      var dataName = data.Name + data.ID.substring(0, 5);
      console.log(data.Name);

      return this.file
        .checkFile(
          this.file.externalDataDirectory + "images/",
          dataName + ".png"
        )
        .then(
          resolve => {
            if (resolve == true) {
              console.log("file found");
              return this.file.checkFile(
                this.file.externalDataDirectory + "images/",
                dataName + ".png"
              );
            } else {
              console.log("file not found");
              return false;
            }
          },
          reject => {
            console.log("file not found");
            return null;
          }
        );
    } else {
      return this.file
        .checkFile(
          this.file.externalDataDirectory + "images/",
          data.Name + ".png"
        )
        .then(
          resolve => {
            if (resolve == true) {
              console.log("file found");
              return this.file.checkFile(
                this.file.externalDataDirectory + "images/",
                data.Name + ".png"
              );
            } else {
              console.log("file not found");
              return false;
            }
          },
          reject => {
            console.log("file not found");
            return null;
          }
        );
    }
  }

  checkNetworkStatusOnPage() {
    this.network.onConnect().subscribe(res => {
      this.events.publish("nstatus", true);
    });

    this.network.onDisconnect().subscribe(res => {
      this.events.publish("nstatus", false);
    });
  }

  shareDeals(data) {
    this.createLoader();
    var message = "Now get all deals at one place \\n" + data.Name;
    this.createDynamicLinks(data.Url).then(
      (res: any) => {
        data.Url = res;
        this.socialSharing.share(message, "", data.Logo, data.Url);
        this.dismissLoader();
      },
      err => {
        data.Url = data.Url;
        this.socialSharing.share(message, "", data.Logo, data.Url);
        this.dismissLoader();
      }
    );
  }

  createDynamicLinks(data) {
    return cordova.plugins.firebase.dynamiclinks.createShortDynamicLink({
      link: data
    });
  }
}
