import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  
  private platform : Platform, private events
                                       : Events
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.events.publish('change-tab', 0);
      backAction();
    }, 2);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
    else {
      this.navCtrl.popToRoot();
    }
}  

}
