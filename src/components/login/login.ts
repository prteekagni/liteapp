import { Component } from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, NavController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { LOCATION_INITIALIZED } from "@angular/common";
import { SharedProvider } from "../../providers/shared/shared";

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
    private googlePlus: GooglePlus,
    private sharedService: SharedProvider
  ) {}

  onSubmit(data) {
    this.authService.loginUser(data).subscribe((res: any) => {
      console.log(res);
      if (res.Token.Value) {
        this.authService.setUserLogin();
        this.authService.setUserDetails(res);
        this.events.publish("login", true);
        this.authService.setToken(res.Token);
      } else {
        this.sharedService.createToast("Wrong Password");
      }
    });
  }

  forgotPassword() {
    // this.googlePlus.logout().then(res => {
    //   console.log(res);
    // });

    this.navCtrl.push("ForgotpassPage", {
      data: "prateek@elinfinitoindia.in"
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
        this.authService.setUserLogin();
        this.authService.setloginStatus();
        this.events.publish("login", true);

      })
      .catch(err => console.log(JSON.stringify(err)));
  }
}
