import { Component } from '@angular/core';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events, NavController } from 'ionic-angular';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  text: string;

  constructor(
    private authService: AuthenticateProvider,
    private events: Events,
    private navCtrl: NavController
  ) {
    console.log('Hello LoginComponent Component');
    this.text = 'Hello World';
  }



  login() {
    this.authService.setUserLogin();
    this.events.publish('login', true);

  }

  forgotPassword() {
    this.navCtrl.push('ForgotpassPage');
  }
  

  gotoRegister(){
    this.navCtrl.push('RegisterPage');
  }

}
