import { Component, Input } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { Subject } from "rxjs";

/**
 * Generated class for the WaitmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-waitmodal",
  templateUrl: "waitmodal.html"
})
export class WaitmodalPage {
  logo: string;
  data;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sharedService: SharedProvider,
    private viewController: ViewController
  ) {
    this.data = this.navParams.get("data");
    this.logo = this.data.Name;
    console.log(this.data);

    // this.sharedService.browserOpenSubject.subscribe(res => {
    //   if (res) {
    //     this.dismiss();
    //   }
    // });
    setTimeout(() => {
      this.dismiss();
      this.sharedService.openBrowser(this.data);
    }, 300);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WaitmodalPage");
  }
  dismiss() {
    this.viewController.dismiss();
  }
}
