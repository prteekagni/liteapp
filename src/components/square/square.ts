import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the SquareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'square',
  templateUrl: 'square.html'
})
export class SquareComponent {

  text: string;
  @Input() items;
  @Output() clickeve = new EventEmitter();

  constructor(
    private navCtrl: NavController
  ) {
    console.log('Hello SquareComponent Component');
    this.text = 'Hello World';
  }


  getOfferDetail
  (data) {
    this.navCtrl.push(
      'ProductlistPage',
      {
        cat: data.Category,
        type:"deals"
      }
    )
  }

}
