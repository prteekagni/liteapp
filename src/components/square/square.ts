import { Component, Output, EventEmitter, Input } from '@angular/core';

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
  @Input() items
           ;
  @Output() clickeve = new EventEmitter();

  constructor() {
    console.log('Hello SquareComponent Component');
    this.text = 'Hello World';
  }


  getOfferDetail() {
    this.clickeve.emit();
  }

}
