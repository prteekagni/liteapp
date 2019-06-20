import { Component } from '@angular/core';

/**
 * Generated class for the CardgridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cardgrid',
  templateUrl: 'cardgrid.html'
})
export class CardgridComponent {

  text: string;

  constructor() {
    console.log('Hello CardgridComponent Component');
    this.text = 'Hello World';
  }

}
