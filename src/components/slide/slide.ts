import { Component } from '@angular/core';

/**
 * Generated class for the SlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent {

  text: string;

  constructor() {
    console.log('Hello SlideComponent Component');
    this.text = 'Hello World';
  }

}
