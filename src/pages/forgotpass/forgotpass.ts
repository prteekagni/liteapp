import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {


  public email;
  public otp;
  public status;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedService: SharedProvider,
    public authService: AuthenticateProvider
                        
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
  }

 verifyOtp() {
    this.authService.verifyOtp(this.otp).subscribe(res => {
      console.log(res);
      if (res == "verfiy otp") {
        this.navCtrl.push('PasswordchangePage', {
          changePassword: "false"
        })
      }
      else {
        this.sharedService.createToast('Otp not verified');
      }
    }, err => {
      console.log(err);
    })
  }

  sendOtp() {
   
    this.authService.sendOtp(this.email).subscribe(res=>{
      console.log(res);
      this.status = false;
    },err=>{
      this.sharedService.createToast("Unable to send otp");
    })
  
  }

  resendOtp() {
    this.status = true;
  }

}
