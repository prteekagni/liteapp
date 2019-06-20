import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Events } from 'ionic-angular';

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
  @Output() voted = new EventEmitter<any>();


  constructor(
    private event :Events
  ) {
    console.log('Hello CardslideComponent Component');
    this.text = 'Hello World';


  }

  getToDeal(data){
    this.voted.emit('hello');
  }

}
