import { Component, ViewChild, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events, Platform, LoadingController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { AppMinimize } from '@ionic-native/app-minimize';
import { LocalNotifications } from '@ionic-native/local-notifications';


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
  timeStarts: any;
  date: any;
  isLoggedIn: boolean = false;
  data = { date: '', time: '' };
  lnotification: any = [];
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private loadingCtrl: LoadingController,
    private localNotifications: LocalNotifications
  ) {  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.slides = [
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
    ];

    
  // this.localNotifications.on("yes", function(notification) {
  //   alert(notification);
   
  // });

    this.localNotifications.on("yes").subscribe(res => {
     alert(res);
    })
  
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
 

  goToNotification() {
    this.navCtrl.push('NotificationPage');
  }
              
  

  goToFav() {
    
    
  }

  set(data) {
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.date = new Date(utc +" "+this.timeStarts);
    console.log(this.date)
    console.log(this.timeStarts)
    let notification: any = {
      id: data,
      title: 'Do you want to go see a movie tonight?',
    actions: [{ id: 'yes', title: 'Reschedule' }],
      trigger: { at: this.date },
      led: 'FF0000',
    }


      this.lnotification = JSON.parse(localStorage.getItem('notification')) || [];
    this.lnotification.push(notification);

    localStorage.setItem('notification', JSON.stringify(this.lnotification));
   

    console.log(this.lnotification);
    this.localNotifications.schedule(this.lnotification);

  }


                               

}
