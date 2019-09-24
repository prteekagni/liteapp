import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the LinkmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-linkmodal",
  templateUrl: "linkmodal.html"
})
export class LinkmodalPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController
  ) {
    console.log(this.navParams.get("data"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LinkmodalPage");
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
