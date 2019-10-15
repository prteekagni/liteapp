import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";
import { Content } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Events } from "ionic-angular";
/**
 * Generated class for the DealsgridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "dealsgrid",
  templateUrl: "dealsgrid.html"
})
export class DealsgridComponent implements OnInit {
  text: string;
  cards: any = [];
  @Input() items: any;
  @Input() type: any;
  @Output() data = new EventEmitter();
  copyItem: any;
  directLinks: boolean = false;
  @ViewChild(Content) content: Content;

  constructor(
    private dealService: DealsProvider,
    private http: HttpClient,
    private event: Events
  ) {}

  ngOnInit() {
    console.log(this.items + " &" + this.type);
    this.copyItem = this.items;

    if (this.type === "deals") {
      this.dealService
        .getDealSubCategory(this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    } else if (this.type == "substores") {
      this.dealService
        .getSubStores(this.items.CatPID, this.items.ID)
        .subscribe((res: any) => {
          this.cards = res;
        });
    } else if (this.type == "stores") {
      this.dealService.getStores(this.items.ID).subscribe((res: any) => {
        this.cards = res;
        if (this.cards.length > 1 && this.cards[0].StoreType == 1) {
          this.directLinks = true;
        }
      });
    } else if (this.type == "products") {
      this.dealService.getProductCategory().subscribe((res: any) => {
        this.cards = res;
      });
    }
  }
}
