import { Component, Input } from "@angular/core";
import { DealsProvider } from "../../providers/deals/deals";
import { map } from "rxjs/operators";

@Component({
  selector: "aslidinglist",
  templateUrl: "aslidinglist.html"
})
export class AslidinglistComponent {
  text: string;
  store: any = [];
  @Input() items: any;
  @Input() featureid: any;
  @Input() type: string;
  constructor(private dealsService: DealsProvider) {}
  ngOnInit(): void {
    console.log("Adsliding" + this.items);
    console.log("Adsliding" + this.featureid);
    this.dealsService
      .getStores(this.items, this.featureid)
      .subscribe((res: any) => {
        this.store = res;
      });
  }
}
