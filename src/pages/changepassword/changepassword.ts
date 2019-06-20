import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public appCtrl: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  changePassword() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot('TabsPage');
    
  }
}
