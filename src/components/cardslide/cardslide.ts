import { Component } from '@angular/core';

/**
 * Generated class for the CardslideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cardslide',
  templateUrl: 'cardslide.html'
})
export class CardslideComponent {

  text: string;

  constructor() {
    console.log('Hello CardslideComponent Component');
    this.text = 'Hello World';
  }

}
