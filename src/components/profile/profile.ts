import {
  Component,
  ElementRef,
  ViewChild,
  Renderer,
  Renderer2,
  AfterViewInit
} from "@angular/core";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Events, AlertController } from "ionic-angular";
import { ModalController, ViewController } from "ionic-angular";
import { FormBuilder, Validators, NgForm } from "@angular/forms";
import { DISABLED } from "@angular/forms/src/model";

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: "profile",
  templateUrl: "profile.html"
})
export class ProfileComponent implements AfterViewInit {
  text: string;
  changepassword: boolean = false;
  profileForm;
  editForm: boolean = false;
  @ViewChild("name") nameField: ElementRef;
  profile = {
    name: "Prateek",
    email: "prateek",
    mobile: "99905"
  };

  constructor(
    private authService: AuthenticateProvider,
    private events: Events,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {
    console.log("Hello ProfileComponent Component");
    this.text = "Hello World";

    // this.profileForm = this.formBuilder.group(
    //   {
    //     name: ['fgdfgfg'],
    //     mobile: ['99990590944'],
    //     email: ['eln@gmail.com']
    //   },

    // );

    // this.profileForm.disable();
  }

  ionViewWillLoad() {}

  ngAfterViewInit() {
    // console.log(this.nameField.nativeElement)
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
            this.authService.setUserLogout();
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
    //   if (this.profileForm.get["name"] == data.name) {
    //     console.log(data.name);
    //   }
    //   else {
    //     console.log(data.name)
    //   }
    // }
    let formControls = data.controls;
    if (formControls.name.dirty) {
      console.log("It's dirty");
      console.log(data.value);
    } else {
      console.log("not dirty");
    }
  }
}
