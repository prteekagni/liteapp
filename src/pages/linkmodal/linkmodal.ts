import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";
import { AlertController } from "ionic-angular";
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
  Url: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController,
    private http: HttpClient,
    private sharedService: SharedProvider,
    private modalController: ModalController
  ) {
    this.items = this.navParams.get("data");
    this.Url = this.items.Url;
    console.log("From Link modal" + this.Url);
    
    this.title = this.navParams.get("data").Name;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LinkmodalPage");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.http
    //   .get("http://192.168.225.36:52044/api/stores")
    //   // .pipe(map((res: any) => res.filter((resp: any) => resp.isFav == true)))
    //   .subscribe((res: any) => {
    //     this.items = res;
    //     console.log(this.items);
    //   });
  }

  goToUrl(data) {
   console.log(data);
   
    let modal = this.modalController.create(
      "WaitmodalPage",
      {
        data: data
      },
      {
        cssClass: "mymodal"
      }
    );
    modal.present();
    this.dismiss();
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
