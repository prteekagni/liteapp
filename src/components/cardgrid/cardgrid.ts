import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { take, tap, map } from "rxjs/operators";

/**
 * Generated class for the CardgridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "cardgrid",
  templateUrl: "cardgrid.html"
})
export class CardgridComponent {
  text: string;
  items: any = [];

  constructor(private dealsProvider: DealsProvider, private http: HttpClient) {
    // this.dealsProvider
    //   .getStoreCategory()
    //   .pipe(take(1))
    //   .subscribe((res: any) => {
    //     this.items = res;
    //     console.log(this.items);
    //   });
    this.http
      .get("http://192.168.225.36:52044/api/stores")
      .pipe(map((res: any) => res.filter((resp: any) => resp.isFav == true)))
      .subscribe((res: any) => {
        this.items = res;
        console.log(this.items);
      });
  }
}
