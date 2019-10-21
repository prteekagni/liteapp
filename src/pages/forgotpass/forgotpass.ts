import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";

/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forgotpass",
  templateUrl: "forgotpass.html"
})
export class ForgotpassPage {
  public email;
  public otp;
  public status: boolean = true;
  expression: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedService: SharedProvider,
    public authService: AuthenticateProvider
  ) {
    let id = this.navParams.get("data");
    // this.authService.sendOtp(id).subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotpassPage");
  }

  verifyOtp() {
    this.authService.verifyOtp(this.otp).subscribe(
      res => {
        console.log(res);
        if (res == "verfiy otp") {
          this.navCtrl.push("PasswordchangePage", {
            changePassword: "false"
          });
        } else {
          this.sharedService.createToast("Otp not verified");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(email) {
    this.authService.sendOtp(email).subscribe(
      res => {
        if (res == "Inavalid Email") {
          this.sharedService.createToast("Invalid Email");
        } else {
          this.status = false;
        }
      },
      err => {
        this.sharedService.createToast("Unable to send otp");
      }
    );
  }

  resendOtp() {
    this.status = true;
  }
}
