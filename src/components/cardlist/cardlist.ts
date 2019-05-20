import { Component } from '@angular/core';

/**
 * Generated class for the CardlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cardlist',
  templateUrl: 'cardlist.html'
})
export class CardlistComponent {

  text: string;

  constructor() {
    console.log('Hello CardlistComponent Component');
    this.text = 'Hello World';
  }

}
