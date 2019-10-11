import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController, Events } from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

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

declare var window: { KochavaTracker };

@Injectable()
export class SharedProvider {
  loading;

  constructor(
    private loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private network: Network,
    private events: Events,
    private nativeTrasnitions: NativePageTransitions,
    private file: File,
    private transfer: FileTransfer,
    private inappBrowser: InAppBrowser
  ) {
    this.network.onConnect().subscribe(() => {
      console.log("network connected!");
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.

      this.events.publish("nstatus", true);
    });

    this.network.onDisconnect().subscribe(() => {
      console.log("network disconnected!");
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      this.events.publish("nstatus", false);
    });
    console.log("Hello SharedProvider Provider");
  }

  createToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  createLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="../../assets/loader_icon.svg"/>
      `,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoader() {
    this.loading.dismiss();
    this.loading.onDidDismiss(() => {
      console.log("Dismissed loading");
    });
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

  shareApp(data) {
    this.socialSharing
      .share(data.message, data.subject, data.image, data.link)
      .then(() => {
        console.log("share succesfull");
      });
  }

  isConnected() {
    let conntype = this.network.type;
    return conntype;
  }

  checkNetworkStatus() {
    let conntype = this.network.type;

    if (conntype === "NONE" || conntype === "none") {
      return false;
    } else {
      return true;
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
    console.log(error);
    this.createToast(error.statusText);
  }

  // createBrowserLink

  openBrowser(data) {
    const url = "http://" + data.Url;
    console.log(url);
    const browser = this.inappBrowser.create(url);
    // browser.on("loadstop").subscribe(event => {
    //   browser.insertCSS({ code: "body{color: red;" });
    // });
  }

  downloadOnMemory(data) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = encodeURI(data.Logo);
    const targetPath =
      this.file.externalDataDirectory + "images/" + data.Name + ".png";
    return fileTransfer.download(url, targetPath, true);
  }

  checkDownloadedImage(data): Promise<string> {
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
