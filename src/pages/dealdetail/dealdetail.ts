import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DealdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
defaultHistory: ['ProductsPage',]
} 
)
@Component({
  selector: 'page-dealdetail',
  templateUrl: 'dealdetail.html',
})
export class DealdetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController : ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealdetailPage');
  }


  dismiss() {
    this.viewController.dismiss();
  }

}
