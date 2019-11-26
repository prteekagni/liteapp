import { Component } from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, NavController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { LOCATION_INITIALIZED } from "@angular/common";
import { SharedProvider } from "../../providers/shared/shared";
import { NgForm } from "@angular/forms";
import { BrowserTab } from "@ionic-native/browser-tab";

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
    private sharedService: SharedProvider,
    private Browser: BrowserTab
  ) {}

  onSubmit(data: NgForm) {
    this.authService.loginUser(data.value).subscribe((res: any) => {
      console.log(res);
      this.events.publish("login", true);
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

  loginWithTrueCaller(){
    this.Browser.openUrl(`truecallersdk://truesdk/web_verify?
                               requestNonce=UNIQUE_REQUEST_ID
                               &partnerKey=DBiI36fc5fdf08d2245b491909b2fbe9428a1
                               &partnerName=dealslocker
                               &lang=EN
                               &title=El Infinito Technologies`);
                               setTimeout(function() {
                                 if (document.hasFocus()) {
                                   // Truecaller app not present on the device and you redirect the user
                                   // to your alternate verification page
                                 } else {
                                   // Truecaller app present on the device and the profile overlay opens
                                   // The user clicks on verify & you'll receive the user's access token to fetch the profile on your
                                   // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
                                 }
                               }, 600);
  }
}
