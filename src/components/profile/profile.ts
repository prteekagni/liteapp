import { Component } from '@angular/core';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events, AlertController } from 'ionic-angular';
import { ModalController , ViewController} from 'ionic-angular';
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
  changepassword: boolean = false;
  constructor(

    private authService: AuthenticateProvider,
    private events: Events,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController

  ) {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
  }


  logOut() {
    if (alert) {
      console.log(alert);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Logout',
            handler: () => {
              this.authService.setUserLogout();
              this.events.publish('logout', 'false');
            }
          }
        ]
      });
      alert.present();
      
    }
  
   
  }


  changePassword(){
  
 let contactModal = this.modalCtrl.create('ChangepasswordPage');
   contactModal.present();
  
    
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
