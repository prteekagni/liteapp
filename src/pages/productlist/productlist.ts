import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, ToastController, Item, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { deals } from '../../models/deal';
import { NotificationProvider } from '../../providers/notification/notification';
import { SharedProvider } from '../../providers/shared/shared';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {


  @ViewChild(Content) _content: Content;

  de: any = [];
  lnotification: any = [];
  items;
  newItem: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageProvider,
    private plt: Platform,
    private toastController: ToastController,
    private notificationService: NotificationProvider,
    public alertCtrl: AlertController,
    public sharedService: SharedProvider,
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController,
    private http: HttpClient
  )
  {
    var cat = this.navParams.get('cat');
    var type = this.navParams.get('type')
    if(type == "deals"){
 this.http.get('http://localhost:3000/deals').subscribe(res => {
      this.items = res;
      this.newItem = this.items.filter(x => x.category == cat
                                                          );
      console.log(this.newItem);
   })
    }
    else if (type == "products") {
      this.http.get('http://localhost:3000/products').subscribe(res => {
        this.items = res;
        this.newItem = this.items.filter(x => x.category == cat);
        console.log(this.newItem);
      })
      
    }
   
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
   });
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


  getDeal(){
   
    let dealmodal = this.modalController.create('DealdetailPage', {}, {
      // cssClass: 'mymodal',
      showBackdrop: true,
      enableBackdropDismiss:true
    })
    
    dealmodal.present();
 }
  

}
