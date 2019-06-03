import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  de: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageProvider) {
  }

  ionViewDidLoad() {
  this.storageService.getDeals().then(res => {
    this.de = res;
    this.de.forEach(element => {
      element.time = "";
    });
  });
  
  }

  swipeEvent(event) {
    console.log(event);
     this.de.forEach(element => {
       console.log(element)
    });
  }
}
