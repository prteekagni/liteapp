import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Events
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  register;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private events: Events,
    private sharedService: SharedProvider
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.events.publish("change-tab", 0);
      backAction();
    }, 2);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }

  loginWithEmail() {
    // var eventMapObject = {}
    // eventMapObject["name"] = "Registration";
    this.sharedService.registerEventTrack();
  }

  registerUser(data) {
    console.log(data);
  }
}
