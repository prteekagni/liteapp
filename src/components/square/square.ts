import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the SquareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "square",
  templateUrl: "square.html"
})
export class SquareComponent implements OnInit {
  items: any = [];
  @Input() data;
  @Input() type;
  @Output() clickeve = new EventEmitter();

  constructor(
    private navCtrl: NavController,
    private dealService: DealsProvider,
    private alertController: AlertController
  ) {}

  getOfferDetail(data) {
    if (this.type == "stores") {
      const alert = this.alertController.create({
        title: "Redirecting",
        subTitle: "Redirecting to the store website!",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.navCtrl.push("ProductlistPage", {
        id: data,
        type: "deals"
      });
    }
  }

  ionViewDidEnter() {}

  ngOnInit(): void {
    console.log(this.type);
    console.log("froms square " + this.data);
    if (this.type === "deals") {
      this.dealService
        .getDealSubCategory(this.data.ID)
        .subscribe((res: any) => {
          this.items = res;
          console.log(this.items);
        });
    } else if (this.type == "substores") {
      this.dealService
        .getSubStores(this.items.CatPID, this.items.ID)
        .subscribe((res: any) => {
          this.items = res;
        });
    } else if (this.type == "stores") {
      this.dealService.getStores(this.data.ID).subscribe((res: any) => {
        this.items = res;
        console.log(res);
      });
    } else if (this.type == "products") {
      this.dealService.getProductCategory().subscribe((res: any) => {
        this.items = res;
      });
    }
  }
}
