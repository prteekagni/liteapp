import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";

@IonicPage()
@Component({
  selector: "page-myaccount",
  templateUrl: "myaccount.html"
})
export class MyaccountPage {
  isLoggedIn: boolean;
  login;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googlePlus: GooglePlus,
    private authService: AuthenticateProvider,
    private events: Events
  ) {}

  ionViewWillEnter() {
    this.events.subscribe("login", res => {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    });

    this.events.subscribe("logout", res => {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
    });
    this.isLoggedIn = this.authService.checkUserLogin();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyaccountPage");
  }

  gotoRegister() {
    this.navCtrl.push("RegisterPage");
  }

  // loginWithGoogle() {
  //   this.googlePlus
  //     .login({
  //       webClientId:
  //         "340483402651-a5m6satt4d7d88dvulgh7gbn9m4pa6t8.apps.googleusercontent.com"
  //     })
  //     .then(
  //       res => {
  //         console.log(res);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }
}
