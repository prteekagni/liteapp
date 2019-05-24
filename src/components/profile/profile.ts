import { Component } from '@angular/core';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  text: string;

  constructor(
    private authService: AuthenticateProvider,
    private events: Events
  ) {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
  }


  logOut() {
    this.events.publish('logout', 'false');
    this.authService.setUserLogout();
  }

}
