import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, AlertController, NavController } from "ionic-angular";
import { ModalController, ViewController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { NgForm } from "@angular/forms";
import { StorageProvider } from "../../providers/storage/storage";

@Component({
  selector: "profile",
  templateUrl: "profile.html"
})
export class ProfileComponent implements AfterViewInit {
  text: string;
  changepassword: boolean = false;
  profileForm;
  profile;
  editForm: boolean = false;
  isGoogleLogin: boolean = false;
  @ViewChild("name") nameField: ElementRef;

  constructor(
    private authService: AuthenticateProvider,
    private events: Events,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private googlePlus: GooglePlus,
    private storageService: StorageProvider,
    private navCtrl: NavController
  ) {
    var tempdata = JSON.parse(this.authService.getUserDetail());
    if (this.authService.checkGLogin() == "true") {
      this.isGoogleLogin = true;
      this.profile = tempdata;
    }
    if (tempdata.hasOwnProperty("Result")) {
      this.profile = tempdata.Result;
    } else {
      this.profile = tempdata;
    }
    console.log(this.profile);
  }

  ionViewWillLoad() {}

  ngAfterViewInit() {
    // console.log(this.nameField.nativeElement)
  }

  logOutFromGoogle() {
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Logout",
          handler: () => {
            if (this.authService.getloginStatus() == "true") {
              this.googlePlus.logout().then(
                res => console.log(res),
                err => console.log(err)
              );
            }
            this.authService.logoutUser();
            this.events.publish("logout", "false");
          }
        }
      ]
    });
    alert.present();
  }
  logOut() {
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Logout",
          handler: () => {
            if (this.authService.getloginStatus() == "true") {
            }
            this.authService.logoutUser();
            this.events.publish("logout", "false");
          }
        }
      ]
    });
    alert.present();
  }

  changePassword() {
    let contactModal = this.modalCtrl.create("ChangepasswordPage");
    contactModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // onSubmit() {
  //   console.log(this.profileForm.value);
  //   this.editForm = false;
  //   // this.profileForm.disable();
  // }

  // ePF() {
  //   // this.profileForm.enable();
  //   console.log(this.profileForm.get("name"))
  //   this.editForm = true;
  //   console.log(this.nameField.nativeElement)
  //   // this.renderer.invokeElementMethod(this.input.nativeElement, "focus");
  //   // this.renderer.selectRootElement('#input').focus();
  //   // this.input.nativeElement.focus();

  // }

  updateProfile(data: NgForm) {
    console.log(data);
    this.editForm = !this.editForm;
    let formControls = data.controls;
    console.log(formControls);
    if (formControls.PhoneNo.dirty) {
      console.log("Need to call update api");

      // update priofile requests
    } else {
      console.log("donot call api ");
    }
  }

  UpdatePhoneNo(data) {
    console.log(data);
  }

  getHistory() {
    this.navCtrl.push("ProductlistPage", {
      type: "history"
    });
  }

  removeVisitedStore() {
        let alert = this.alertCtrl.create({
          title: "Confirm",
          message: "Do you want to remove visited store?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Remove",
              handler: () => {
                 this.storageService
                   .removeVisitedStores()
                   .then(res => console.log(res));
              }
            }
          ]
        });
        alert.present();
  }

  removeVisitedCategory() {
     let alert = this.alertCtrl.create({
       title: "Confirm",
       message: "Do you want to remove visited category?",
       buttons: [
         {
           text: "Cancel",
           role: "cancel",
           handler: () => {
             console.log("Cancel clicked");
           }
         },
         {
           text: "Remove",
           handler: () => {
               this.storageService.removeVisitedCategory().then(res => console.log(res));
         }
        }
       ]
     });
     alert.present();
  }
}
