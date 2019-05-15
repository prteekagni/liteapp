import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {


  deals;
  de: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    console.log(this.navParams.get('type'));
  }

  ionViewDidLoad() {
   this.de =  JSON.parse( localStorage.getItem('Deal' || '[]'));
    console.log('ionViewDidLoad ProductlistPage');
  }


  doInfinite(event) {
    alert('gello')
  }

  save() {
   
    var deal = {
      "name": "gdfgdfgfteek",
      "age":"55"
    }

    var deals = [];
    deals.push(deal);

    var de = JSON.parse(localStorage.getItem('Deal'));
    deals.push(de);
    de.forEach(element => {
      if (element.name === deal.name) {
          console.log('already present')
      }
      else {
        localStorage.setItem('Deal', JSON.stringify(deals));
      }
    });
  
  }

}
