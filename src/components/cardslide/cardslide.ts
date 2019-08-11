import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

@Component({
  selector: 'cardslide',
  templateUrl: 'cardslide.html'
})
export class CardslideComponent {

  text: string;
  @Input() items;

  constructor(
    private event: Events,
    private navCtrl: NavController
  )
  {
    console.log('Hello CardslideComponent Component');
    this.text = 'Hello World';
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
