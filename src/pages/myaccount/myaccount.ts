import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  private googlePlus:GooglePlus
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
  }


  gotoRegister() {
    this.navCtrl.push('RegisterPage');
  }


  loginWithGoogle() {
    this.googlePlus.login({
      'webClientId': '340483402651-a5m6satt4d7d88dvulgh7gbn9m4pa6t8.apps.googleusercontent.com'
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    
  }
  
  
}
