import { Component, ViewChild, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events, Platform, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { AppMinimize } from '@ionic-native/app-minimize';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SharedProvider } from '../../providers/shared/shared';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  slides;
  date: any;
  isLoggedIn: boolean = false;
  lnotification: any = [];
  isConnected: boolean;

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private sharedService: SharedProvider,

  ) {

    platform.ready().then(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    })

    platform.resume.subscribe(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    });

  }



  ionViewDidLoad() {

    this.slides = [
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
    ];


  }

  nav11() {
    this.navCtrl.push('ProductlistPage');
  }

  homevote(data) {
    this.events.publish('change-tab', 1, "mobile");
  }

  ionViewWillEnter() {
    this.events.subscribe('nstatus', (res) => {
      if (res == true) {
        this.isConnected = true;
      }
      else {
        this.isConnected = false;
      }
    });
  }

  goToNotification() {
    this.navCtrl.push('NotificationPage');
  }

  goToFav() {
   const animationsOptions = {
     animation: 'wp-transition',
     duration: 1000
   }
   
    this.navCtrl.push('FavouritesPage', {},animationsOptions);
  }

  toggle() {
    this.isConnected = !this.isConnected;
  }

}
