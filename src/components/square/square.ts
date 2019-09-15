import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";

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
  text: any = [];
  @Input() data;
  @Output() clickeve = new EventEmitter();

  constructor(
    private navCtrl: NavController,
    private dealService: DealsProvider
  ) {}

  getOfferDetail(data) {
    this.navCtrl.push("ProductlistPage", {
      cat: data.Category,
      type: "deals"
    });
  }

  ionViewDidEnter() {}

  ngOnInit(): void {
    this.dealService.getDealSubCategory(this.data).subscribe((res: any) => {
      this.text = res;
    });
  }
}
