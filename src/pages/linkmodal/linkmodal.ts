import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";

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
export class LinkmodalPage implements OnInit {
  items: any = [];
  title: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController,
    private http: HttpClient,
    private sharedService: SharedProvider
  ) {
    console.log(this.navParams.get("data"));
    this.title = this.navParams.get("data").Name;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LinkmodalPage");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http
      .get("http://192.168.225.36:52044/api/stores")
      .pipe(map((res: any) => res.filter((resp: any) => resp.isFav == true)))
      .subscribe((res: any) => {
        this.items = res;
        console.log(this.items);
      });
  }

  dismiss() {
    this.viewController.dismiss();
  }

  goToUrl(data) {
    this.sharedService.createToast("launching Website");
  }
}
