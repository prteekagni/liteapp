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
      value: '1',
      checked: true
    });
    alertBtn.addInput({
      type: 'radio',
      label: '1 Hour',
      value: '2',
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
    
    var timeInMiliSeconds = (+time) * (60 * 1000);
    console.log(timeInMiliSeconds);
    var nTime = new Date().getTime() + timeInMiliSeconds;
    console.log(nTime);

    let notification: any = {
      id: data.id,
      title: 'Do you want to go see a movie tonight?',
      actions: [{ id: 'reschedule', title: 'Reschedule' }],
      trigger: { at: nTime },
      led: 'FF0000',
    }

    return this.storageService.addNotification(notification).then(res => {
     this.scheduleNotification(notification);
      return res;
    });
  }

  scheduleNotification(data) {
    // this.storageService.getNotification().then(res => {
    //   this.lNotification = JSON.stringify(res);
    // });

    // this.localNotification.schedule(this.lNotification);
    console.log(data);
    this.localNotification.schedule(data);
 

  }

    

}
