import { Component, ViewChild } from "@angular/core";
import { Platform, App, Nav, IonicApp, ModalController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SharedProvider } from "../providers/shared/shared";
import { OneSignal } from "@ionic-native/onesignal";
import { StorageProvider } from "../providers/storage/storage";
import { Deeplinks } from "@ionic-native/deeplinks";
import { NotificationProvider } from "../providers/notification/notification";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { GooglePlus } from "@ionic-native/google-plus";
import { Storage } from "@ionic/storage";
import { HomePage } from "../pages/home/home";
import { DealsPage } from "../pages/deals/deals";
import { ProductsPage } from "../pages/products/products";
import { MyaccountPage } from "../pages/myaccount/myaccount";
import { DealdetailPage } from "../pages/dealdetail/dealdetail";
import { ProductlistPage } from "../pages/productlist/productlist";
import { AppMinimize } from "@ionic-native/app-minimize";

declare var window: { KochavaTracker };

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "TabsPage";
  counter = 0;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public ionicApp: IonicApp,
    private app: App,
    private sharedService: SharedProvider,
    private oneSignal: OneSignal,
    private storageService: StorageProvider,
    private deeplinks: Deeplinks,
    localNotification: LocalNotifications,
    private googlePlus: GooglePlus,
    private storage: Storage,
    private modalController: ModalController,
    private appMinimize: AppMinimize
  ) {
    platform.ready().then(() => {      
       this.storage.get('introShown').then((result) => {

              if(result){
                this.rootPage = "TabsPage";
              } else {
                this.rootPage = 'IntroPage';
                this.storage.set('introShown', true);
              }
              // this.loader.dismiss();
          });
      // statusBar.styleDefault();
      statusBar.overlaysWebView(true);
      // set status bar to white

      if (platform.is("android")) {
        // statusBar.styleBlackTranslucent();
        statusBar.backgroundColorByHexString("#80000000");
      }
      // statusBar.backgroundColorByHexString("#ff4500");
      splashScreen.hide();
      
      this.deeplinks
        .route({
          "/": "TabsPage",
          "/products": "ProductsPage",
          "/productlist/:id": "ProductlistPage",
          "/todays-event": "EventPage",
          "/Dealdetail/:id": "DealdetailPage",
          "forgotpassword/:id": "ForgotpassPage"
        })
        .subscribe(
          match => {
            if (match.$route == "ProductsPage" || match.$route == "DealsPage") {
              this.nav.setRoot(match.$route).then(res => {});
            } else {
              this.nav.push(match.$route, match.$args).then(
                res => {
                  console.log("push successful");
                },
                err => {
                  this.nav.push("HomePage");
                  console.log("unsuccesful");
                }
              );
            }
          },
          nomatch => {
            alert(JSON.stringify(nomatch));
          }
        );
      this.initializeOneSignal();
      this.initializeTracker();
        localNotification.on("click").subscribe((res: any) => {
          // this.nav.push("DealdetailPage", {
          //   data: res.data
          // });
          let modal = this.modalController.create("DealdetailPage", {
            data: res.data
          });
          modal.present();
        });
      storageService
        .checkDirectory()
        .then(res =>
          console.log(JSON.stringify(res), err =>
            console.log(JSON.stringify(err))
          )
        );
      // this.googlePlus.trySilentLogin({}).then(
      //   res => console.log(res),
      //   err => console.log(err)
      // );
           var lastTimeBackPress = 0;
           var timePeriodToExit = 2000;
      platform.registerBackButtonAction(() => {
   
        // get current active page
        let navstring = app.getActiveNavs()[0];
        let activeView = navstring.getActive().instance;
        let ismodalopened = this.ionicApp._modalPortal.getActive();
        if (ismodalopened) {
          app.navPop();
        }else
        if (activeView instanceof HomePage) {
          //Double check to exit app
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
           this.appMinimize.minimize();
          } else {
            let toast = this.sharedService.createToast(
              "Press back again to exit App?"
            );
            lastTimeBackPress = new Date().getTime();
          }
          // go to previous page
        } else if (
          activeView instanceof DealsPage ||
          activeView instanceof ProductsPage ||
          activeView instanceof MyaccountPage
        ) {
          // go to previous page
          this.nav.setRoot("TabsPage");
        } else if (activeView instanceof DealdetailPage){
          navstring.popTo("ProductListPage");
        } else if(navstring.canGoBack()) {
                   navstring.pop();
                 }
                 else{
                   this.nav.setRoot("TabsPage");
                 }
      }, 10);
    });
  }

  initializeOneSignal() {
    this.oneSignal.startInit(
      "85ba853d-6931-4776-ac42-ce54c6fd8ba8",
      "340483402651"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.InAppAlert
    );

    this.oneSignal.handleNotificationReceived().subscribe(res => {
      // do something when notification is received
      this.onNotificationRecieved(res.payload);
    });
    this.oneSignal.handleNotificationOpened().subscribe(res => {
      this.onNotificationOpened(res.notification.payload);
      // do something when a notification is opened
    });
    this.oneSignal.endInit();
  }

  initializeTracker() {
    this.sharedService.intializeTracker();
  }

  onNotificationRecieved(data) {
    // alert(JSON.stringify(data));

    this.storageService.savePushNotification(data);
  }

  onNotificationOpened(payloaddata) {
    if (payloaddata.additionalData.page == "Deals") {
      console.log(payloaddata.additionalData);
       let modal = this.modalController.create("DealdetailPage", {
         data: payloaddata.additionalData
       });
       modal.present();
    } else {
      this.nav.setRoot(payloaddata.additionalData.page);
    }
  }
}
