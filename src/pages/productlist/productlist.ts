import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, ToastController, Item, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';
import { StorageProvider } from '../../providers/storage/storage';
import { deals } from '../../models/deal';
import { NotificationProvider } from '../../providers/notification/notification';
import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';
import { SharedProvider } from '../../providers/shared/shared';



@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {


  @ViewChild(Content) _content: Content;

  de: any = [];
  lnotification: any = [];
  items: deals[] = [];
  newItem: deals[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageProvider,
    private plt: Platform,
    private toastController: ToastController,
    private notificationService: NotificationProvider,
    public alertCtrl: AlertController,
    public sharedService: SharedProvider

  ) {
    console.log(this.navParams.get('type'));
  }

  ionViewDidLoad() {
    
    // this.storageService.getDeals().then(res => {
    //   this.de = res;
    //   this.de.forEach(element => {
    //     element.time = "";
    //   });
    // });

  }

  ionViewWillEnter() {

    this.newItem = [
      {
        id: 1,
        title: "string",
        link: "string",
        image: "string",
        description: "string",
        reminder: "string"
      },
      {
        id: 2,
        title: "string",
        link: "string",
        image: "string",
        description: "string",
        reminder: "string"
      },
      
      {
        id: 3,
        title: "string",
        link: "string",
        image: "string",
        description: "string",
        reminder: "string"
      },
      
    ];

 
   

    // this.storageService.addDeals(this.newItem).then(res => {
    //   this.newItem = <deals>{};
    //   if (res == true) {
    //     this.showToast('Item added!');
    //   }
    //   else {
    //     this.showToast('Already in the list');

    //   }
    // });

  }

  setDealAsFav(element) {
    this.storageService.addDeals(element).then(res => {
      if (res == true) {
        this.showToast('Item added!');
      }
      else {
        this.showToast('Already in the list');
    
      }
    });
    
  }
 remindBtn(item) {
   this.notificationService.remindBtn((time) => {
     this.notificationService.setNotification(item, time)
       .then(res => {
         if (res == true) {
          this.showToast('Reminder Updated')
         }
         else {
           this.showToast('Reminder Scheduled')
         }
       })
   })
  }


  setAsFav(data) {
    this.sharedService.addToFavEventTrack(data);
    
    this.storageService.addDeals(data).then(res => {
      if (res == true) {

        this.showToast('Deal added to favourite');
      }
      else{
        this.showToast('Deal already present');
      }
    })
  }
  
  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
