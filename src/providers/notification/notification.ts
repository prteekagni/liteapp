import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StorageProvider } from '../storage/storage';
import { AlertController } from 'ionic-angular';

@Injectable()
export class NotificationProvider {


  lNotification: any = [];
  constructor
    (
    public http: HttpClient,
    public localNotification: LocalNotifications,
    private storageService: StorageProvider,
    private alertCtrl: AlertController
  
  )
  {
    console.log('Hello NotificationProvider Provider');
  }

   remindBtn(_callback) {

    let alertBtn = this.alertCtrl.create();
    alertBtn.setTitle("Set Reminder");
    alertBtn.addInput({
      type: 'radio',
      label: '30 Mins',
      value: '30',
      checked: true
    });
    alertBtn.addInput({
      type: 'radio',
      label: '1 Hour',
      value: '60',
      checked: false
    });

    alertBtn.addInput({
      type: 'radio',
      label: '2 Hour',
      value: '120',
      checked: false

    });

    alertBtn.addInput({
      type: 'radio',
      label: '6 Hour',
      value: '360',
      checked: false

    });
    alertBtn.addInput({
      type: 'radio',
      label: '10 Hour',
      value: '600',
      checked: false
    });
    alertBtn
      .addButton('Cancel');
    alertBtn
      .addButton({
        text: 'OK',
        handler: time => {
          _callback(time);
        }
      });
      alertBtn.present();
  }


  setNotification(data, time): Promise<any>{
    
    var timeInMiliSeconds = (+time) * (60 * 60);
    var nTime = new Date().getTime() + timeInMiliSeconds;

    let notification: any = {
      id: data,
      title: 'Do you want to go see a movie tonight?',
      actions: [{ id: 'reschedule', title: 'Reschedule' }],
      trigger: { at: nTime },
      led: 'FF0000',
    }

    return this.storageService.addNotification(notification).then(res => {
      return res;
    });
    // this.lnotification = JSON.parse(localStorage.getItem('notification')) || [];
    // this.lnotification.push(notification);
    // localStorage.setItem('notification', JSON.stringify(this.lnotification));
    // console.log(this.lnotification);
    // this.localNotifications.schedule(this.lnotification);
    
    
  }

  scheduleNotification() {
    this.storageService.getNotification().then(res => {
      this.lNotification = res;
    });

    this.localNotification.schedule(this.lNotification);
  }

    

}
