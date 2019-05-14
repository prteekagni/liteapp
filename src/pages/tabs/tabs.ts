import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, Tabs } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  HomePage: any = 'HomePage';
  DealsPage: any = 'DealsPage';
  ProductsPage: any = 'ProductsPage';
  MyaccountPage: any = 'MyaccountPage';
  @ViewChild(Tabs) tabs: Tabs;

  tab2Params = { data: ''};

  


  constructor(
    private events: Events
  ) {


  
    this.events.subscribe('change-tab', (tab, data) => {
      this.tabs.select(tab);
      this.tab2Params.data = data;
      console.log(this.tab2Params.data)
    })
  }
}
