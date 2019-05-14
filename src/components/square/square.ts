import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello SquareComponent Component');
    this.text = 'Hello World';
  }

}
