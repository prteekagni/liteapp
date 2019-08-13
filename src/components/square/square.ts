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

  text: any = [];
  @Input() items;
  @Output() clickeve = new EventEmitter();

  constructor(
    private navCtrl: NavController
  ) {
    console.log('Hello SquareComponent Component');


    this.text = [
      {
        "id": "1",
        "name": "one",
        "image":"http://elinfinitoindia.in/images/logo.png"
      },
      {
        "id": "2",
        "name": "one",
        "image":"http://elinfinitoindia.in/images/logo.png"
      },
      {
        "id": "3",
        "name": "one",
        "image":"http://elinfinitoindia.in/images/logo.png"
      },
      {
        "id": "4",
        "name": "one",
        "image":"http://elinfinitoindia.in/images/logo.png"
      },
    ]



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
