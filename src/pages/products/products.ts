import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { DealsProvider } from '../../providers/deals/deals';

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
  pCategories: any =[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private dealsService: DealsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
                        
    
  }

  ionViewWillEnter() {
    this.pCategories
          = this.dealsService.getProductCategory().subscribe(res => {
      this.pCategories
            = res || [];
    },
      err => {
        this.pCategories = [];
        console.log(this.pCategories);
    })
    
  }


  gotoProducts(data) {


    this.sharedService.nativeSlide();
    this.navCtrl.push('ProductlistPage', {
      id: data.id,
      type:"fashion"
    });
  }
}
