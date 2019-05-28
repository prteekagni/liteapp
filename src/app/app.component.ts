import { Component } from '@angular/core';
import { Platform, App, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network'
import { SharedProvider } from '../providers/shared/shared';

declare var window: { KochavaTracker }

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = 'TabsPage';
  counter = 0;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public app: App,
    private events: Events,
    private network: Network,
    private toastCtrl: ToastController,
    private sharedService: SharedProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      // Kochava Tracker Initialization
      var configMapObject = {};
      configMapObject[window.KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY]
        = "kodeals-locker-lite-lnfe1m8y";
      configMapObject[window.KochavaTracker.PARAM_LOG_LEVEL_ENUM_KEY] = window.KochavaTracker.LOG_LEVEL_ENUM_TRACE_VALUE;
      window.KochavaTracker.configure(configMapObject);
      // var a = this.sharedService.isConnected();
      // alert(a);
    });

    platform.resume.subscribe(() => {
      // var counter = this.network.type;
      // alert(counter)
    })


    // platform.registerBackButtonAction(() => {
    //   let nav = app.getActiveNavs()[0];
    //   if (app.getActiveNavs()[0].root == "DealsPage" || app.getActiveNavs()[0].root == "ProductsPage" || app.getActiveNavs()[0].root == "MyaccountPage") {
    //     if (nav.canGoBack()) {
    //       nav.pop();
    //     }
    //     else {
    //       this.events.publish('change-tab', 0);

    //     }
    //   }
    //   else if (app.getActiveNavs()[0].root == "HomePage") {
    //     if (this.counter == 0) {
    //       console.log(this.counter)
    //       this.counter++;
    //   let toast = this.toastCtrl.create({
    //     message: 'Press again to minimize',
    //     duration: 3000,
    //     position: 'bottom'
    //    });
    //       toast.present();

    //       setTimeout(() => { this.counter = 0 }, 3000)
    //     } else {
    //      console.log("minimize")
    //     }

    //   }
    // })
  }



}
