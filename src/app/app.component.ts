import { Component } from '@angular/core';
import { Platform, App, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'TabsPage';
  counter = 0;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public app: App,
    private events: Events,
  private toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

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
