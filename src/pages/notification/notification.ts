import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageProvider) {
  }

  ionViewDidLoad() {
    this.storageService.getPushNotification().then(res => {
      console.log(res);
    });
    this.storageService.getNotification().then(res => {
      console.log(res);
    })
  }

}
