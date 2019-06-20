import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
 
    
  }


  gotoProducts() {


    this.sharedService.nativeSlide();
    this.navCtrl.push('ProductlistPage', {
      id: '123',
      type:'products'
    });
  }
}
