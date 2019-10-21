import { Component } from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, NavController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { LOCATION_INITIALIZED } from "@angular/common";

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "login",
  templateUrl: "login.html"
})
export class LoginComponent {
  text: string;
  login: any;

  constructor(
    private authService: AuthenticateProvider,
    private events: Events,
    private navCtrl: NavController,
    private googlePlus: GooglePlus
  ) {}

  onSubmit(data) {
    console.log(data);
    this.authService.setUserLogin();
    this.events.publish("login", true);
  }

  forgotPassword() {
    // this.googlePlus.logout().then(res => {
    //   console.log(res);
    // });

    this.navCtrl.push("ForgotpassPage",{
      data:"prateek@elinfinitoindia.in"
    });

    // this.navCtrl.push("ForgotpassPage");
  }

  gotoRegister() {
    this.navCtrl.push("RegisterPage");
  }

  loginWithGoogle() {
    // this.googlePlus
    //   .login({
    //     webClientId:
    //       "340483402651-a5m6satt4d7d88dvulgh7gbn9m4pa6t8.apps.googleusercontent.com"
    //   })
    //   .then(
    //     res => {
    //       this.authService.setUserLogin();
    //       this.events.publish("login", true);
    //       console.log(res);
    //     },
    //     err => {
    //       alert(err);
    //     }
    //   );

    this.googlePlus
      .login({})
      .then((res: any) => {
        console.log(res);
        this.authService.setUserDetails(res);
      })
      .catch(err => alert(err));
  }
}
