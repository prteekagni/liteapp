import { Component } from '@angular/core';

/**
 * Generated class for the SingleaddComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'singleadd',
  templateUrl: 'singleadd.html'
})
export class SingleaddComponent {

  text: string;

  constructor() {
    console.log('Hello SingleaddComponent Component');
    this.text = 'Hello World';
  }

}
