import { Component, ViewChild, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events, Platform, LoadingController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { AppMinimize } from '@ionic-native/app-minimize';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  slides;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  
  isLoggedIn: boolean = false;
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private loadingCtrl: LoadingController
  ) {  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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

  login() {
  
   
    
  }



  ionViewWillEnter(){
   
  }
 
                                                                
                               

}
