import { Component, ViewChild } from '@angular/core';
import { Platform, App, Events, ToastController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network'
import { SharedProvider } from '../providers/shared/shared';
import { OneSignal } from '@ionic-native/onesignal';
import { StorageProvider } from '../providers/storage/storage';
import { Deeplinks } from '@ionic-native/deeplinks';

declare var window: { KochavaTracker }

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

 @ViewChild(Nav) nav: Nav;
  rootPage: any = 'TabsPage';
  counter = 0;
  constructor(

    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: App,
    private sharedService: SharedProvider,
    private oneSignal: OneSignal,
    private storageService: StorageProvider,
    private deeplinks: Deeplinks

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      // statusBar.overlaysWebView(true);
      // statusBar.backgroundColorByHexString('#ffffff');
      splashScreen.hide();
      this.deeplinks.route({
        '/': 'TabsPage',
        '/products': 'ProductsPage',
        '/productlist/:id': 'ProductlistPage',
        '/todays-event': 'EventPage',
        '/Dealdetail/:id':'DealdetailPage'
      
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        this.nav.push(match.$route, match.$args).then(res => {
          console.log('push successful')
        }, err => {
          this.nav.push('HomePage');
          console.log('unsuccesful')
        });
      
      }, nomatch => {
        // nomatch.$link - the full link data
        alert(JSON.stringify(nomatch))
      });
      
      // this.initializeOneSignal();
      // this.initializeTracker();
    });
  }

  initializeOneSignal() {
    this.oneSignal.startInit('85ba853d-6931-4776-ac42-ce54c6fd8ba8', '340483402651');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      // do something when notification is received
      this.onNotificationRecieved(res.payload);
    });
    this.oneSignal.handleNotificationOpened().subscribe((res) => {
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
    console.log(payloaddata)
    if (payloaddata.additionalData.page == 'Deals') {
      this.nav.push('DealdetailPage', {
        id:
          payloaddata.additionalData.id
      })
    }
    else {
      this.nav.setRoot(payloaddata.additionalData.page);
    }
  }
}
