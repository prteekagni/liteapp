import { Component, ViewChild } from "@angular/core";
import { Platform, App, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SharedProvider } from "../providers/shared/shared";
import { OneSignal } from "@ionic-native/onesignal";
import { StorageProvider } from "../providers/storage/storage";
import { Deeplinks } from "@ionic-native/deeplinks";
import { NotificationProvider } from "../providers/notification/notification";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { GooglePlus } from "@ionic-native/google-plus";

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
    public app: App,
    private sharedService: SharedProvider,
    private oneSignal: OneSignal,
    private storageService: StorageProvider,
    private deeplinks: Deeplinks,
    localNotification: LocalNotifications,
    private googlePlus: GooglePlus
  ) {
      platform.ready().then(() => {
        console.log("console.log");

        // statusBar.styleDefault();
        statusBar.overlaysWebView(true);
        // set status bar to white
        
        if (platform.is("android")) {
          // statusBar.styleBlackTranslucent();
          statusBar.backgroundColorByHexString("#80000000");
        }
        // statusBar.backgroundColorByHexString("#ff4500");
        splashScreen.hide();
          // this.storageService.removelAll();
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
              if (
                match.$route == "ProductsPage" ||
                match.$route == "DealsPage"
              ) {
                this.nav.setRoot(match.$route).then(res => {
                  console.log("Root Set");
                });
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
          this.nav.push("DealdetailPage", {
            id: res.data.ID
          });
        });
        storageService
          .checkDirectory()
          .then(res =>
            console.log(JSON.stringify(res), err =>
              console.log(JSON.stringify(err))
            )
          );
        this.googlePlus.trySilentLogin({}).then(
          res => console.log(res),
          err => console.log(err)
        );
         platform.registerBackButtonAction(() => {
           var lastTimeBackPress = 0;
           var timePeriodToExit = 2000;
           // get current active page
           let nav = app.getActiveNavs()[0];
           let activeView = nav.getActive();
           if (activeView.component.name == "HomePage") {
             //Double check to exit app
             if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
               platform.exitApp(); //Exit from app
             } else {
               let toast = this.sharedService.createToast(
                 "Press back again to exit App?"
               );
               lastTimeBackPress = new Date().getTime();
             }
             // go to previous page
           } else if (
             activeView.component.name == "DealsPage" ||
             activeView.component.name == "ProductsPage" ||
             activeView.component.name == "MyaccountPage"
           ) {
             // go to previous page
             this.nav.setRoot("TabsPage");
           } else {
             this.nav.pop({});
           }
         });
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
    console.log(JSON.stringify(data));
    this.storageService.savePushNotification(data);
  }

  onNotificationOpened(payloaddata) {
    console.log(payloaddata);
    if (payloaddata.additionalData.page == "Deals") {
      this.nav.push("DealdetailPage", {
        id: payloaddata.additionalData.id
      });
    } else {
      this.nav.setRoot(payloaddata.additionalData.page);
    }
  }
}
