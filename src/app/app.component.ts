import { Component } from '@angular/core';
import { Platform, App, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network'
import { SharedProvider } from '../providers/shared/shared';
import { OneSignal } from '@ionic-native/onesignal';
import { StorageProvider } from '../providers/storage/storage';

declare var window: { KochavaTracker }

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = 'TabsPage';
  counter = 0;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: App,
    private events: Events,
    private network: Network,
    private toastCtrl: ToastController,
    private sharedService: SharedProvider,
    private oneSignal: OneSignal,
    private storageService: StorageProvider

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.initializeOneSignal();
      // this.initializeTracker();
    });
  }

  initializeOneSignal() {
    this.oneSignal.startInit('85ba853d-6931-4776-ac42-ce54c6fd8ba8', '340483402651');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      // do something when notification is received
      res=>this.onNotificationRecieved(res.notification.payload);
    });
    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      res => this.onNotificationOpened(res.notification.payload);
      // do something when a notification is opened
    });
    this.oneSignal.endInit();
  }

  initializeTracker() {
    this.sharedService.intializeTracker();
  }


  onNotificationRecieved(data) {
    alert(JSON.stringify(data));
    this.storageService.savePushNotification(data);
  }

  onNotificationOpened(data) {
    
  }
}
