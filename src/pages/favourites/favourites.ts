import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { SharedProvider } from '../../providers/shared/shared';

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
    public storageService: StorageProvider,
    public sharedService: SharedProvider
  
  ) {
  }

  ionViewDidLoad() {
    this.sharedService.createLoader();
  this.storageService.getDeals().then(res => {
    this.de = res;
    this.de.forEach(element => {
      element.time = "";
     
    });
    this.sharedService.dismissLoader();
    
  });
  
  }

  swipeEvent(event) {
    console.log(event);
     this.de.forEach(element => {
       console.log(element)
    });
  }
}
