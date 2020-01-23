import { Component } from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, NavController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
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
      if (res.Token !== null && res.Token.hasOwnProperty("Value")) {
        this.authService.setUserLogin();
        this.authService.setUserDetails(res);
        this.events.publish("login", true);
        this.authService.setToken(res.Token);
      } else {
        if(res.Token !==null)
        this.sharedService.createToast("Wrong Password");
        else{
          this.sharedService.createToast("No User Found")
        }
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
    this.googlePlus
      .login({})
      .then((res: any) => {
        // alert(JSON.stringify(res));
        this.authService.isGoogleLogin();
        this.authService.setUserDetails(res);
        this.authService.setUserLogin();
        this.authService.setloginStatus();
        this.events.publish("login", true);
      })
      .catch(err => console.log(JSON.stringify(err)));
  }
}
