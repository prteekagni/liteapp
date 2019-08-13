import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { DealsProvider } from '../../providers/deals/deals';

@Component({
  selector: 'cardslide',
  templateUrl: 'cardslide.html'
})
export class CardslideComponent {

  cards: any = [];
  @Input() items;
  @Input() type;
  storelinks;

  constructor(
    private event: Events,
    private navCtrl: NavController,
    private dealService: DealsProvider
  
  )
  {
    console.log('Hello CardslideComponent Component');
    // this.text = 'Hello World';
    // this.dealService.getStoreLinks().subscribe(res => {
    //   this.storelinks = res;
    //   this.text = this.storelinks.filter(x=>x.category == this.items);
    //   console.log(this.text);
    //   // this.Fashion = this.storelinks.filter(x => x.category == "Fashion") || [];
    //   // this.Grocery = this.storelinks.filter(x => x.category == "Grocery") || [];
    //   // this.Entertainment =this.storelinks.filter(x => x.category == "Entertainment") || [];               
    // },
    //   err => {
    //     console.log(err)
    //   });

    if (this.type == "store") {
      this.dealService.getStoreLinks().subscribe(res => {
        this.storelinks = res;
      })
    }
    else if(this.type == "deals"){
    // 
    }
    
  }

  ionViewWillEnter() {
  console.log("viewwillenter")
  }

  goToDeal(item) {

    console.log(item);
    this.navCtrl.push(
      'ProductlistPage', {
       cat:item.Category 
      }
    )
  }

}
