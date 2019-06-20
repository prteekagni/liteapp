import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, ModalController, Content } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SharedProvider } from '../../providers/shared/shared';
import { ScrollHideConfig } from '../../directives/scroll/scroll';

const animationsOptions = {
  animation: 'ios-transition',
  duration: 1000
}



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
  isConnected : boolean;
  showToolbar : boolean;
  visibility  : boolean = true;
  secondpage  : boolean = false;
  thirdpage   : boolean = false;
  @ViewChild(Content) content: Content;
  counter: any = 0;
  morePagesAvailable: boolean = true;
  

  headerScrollConfig: ScrollHideConfig = {
    cssProperty: 'margin-top',
    maxValue: 44
  };
  

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private platform: Platform,

    private sharedService: SharedProvider,
    private modalController: ModalController

  ) {

    platform.ready().then(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    })

    platform.resume.subscribe(() => {
      this.isConnected = this.sharedService.checkNetworkStatus();
    });

    this.showToolbar = false;
    
  }



  ionViewDidLoad() {
    this.slides = [
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
      { 'image': 'http://elinfinitoindia.in/images/logo.png' },
    ];

  console.log('ionicviewleave'+ this.showToolbar);
  }

  nav11() {
    this.navCtrl.push('ProductlistPage');
  }

  homevote(data) {
    this.events.publish('change-tab', 1, "mobile");
  }

  ionViewWillEnter() {

console.log(this.content.contentHeight);

    console.log(this.showToolbar);
 
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
    this.navCtrl.push('NotificationPage' , {} , animationsOptions);
  }

  

  goToFav() {
    // const animationsOptions = {
    //   animation: 'ios-transition',
    //   duration: 1000
    // }
   
    this.navCtrl.push('FavouritesPage', {}, animationsOptions);
  }

  toggle() {
    this.isConnected = !this.isConnected;
  }

  onScroll($event) {
    if ($event) {
      const scrollTop = $event.scrollTop;
      this.showToolbar = scrollTop >= 50;
      console.log(this.showToolbar);
      this.visibility = scrollTop >= 50;
    }
  }

ionViewWillLeave(){
  
}
  
  createModal() {
    let profileModal = this.modalController.create('ChangepasswordPage', {}, {
      cssClass: 'my-modal'
    
   });
   profileModal.present();
  }

  doInfinite(event) {

    if(this.counter == 0) {
      this.secondpage = true;
      this.counter++
    }
    else if (this.counter == 1) {
      this.thirdpage = true;
      this.counter++;
    }
    setTimeout(() => {
      event.complete(); 
    }, 1000);    
  }
}
