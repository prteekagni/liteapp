import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  HomePage: any = 'HomePage';
  DealsPage: any = 'DealsPage';
  ProductsPage: any = 'ProductsPage';
  MyaccountPage: any = 'MyaccountPage';


  constructor() {
  

  }
}
