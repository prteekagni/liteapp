import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { take, tap, map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";

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
  showMore: boolean = false;
  tempsubdeals: any = [];
  constructor(
    private dealsProvider: DealsProvider,
    private sharedProvider: SharedProvider
  ) {
    // this.dealsProvider
    //   .getStoreCategory()
    //   .pipe(take(1))
    //   .subscribe((res: any) => {
    //     this.items = res;
    //     console.log(this.items);
    //   });
    this.dealsProvider.getTopStores().subscribe((res: any) => {
      this.items = res;
      for (let index = 0; index < this.items.length && 6 ; index++) {
        this.tempsubdeals.push(this.items[index]);
        // this.sharedProvider
        //   .downloadOnMemory(this.items[index] ,"stores")
        //   .then((res: any) => {
        //     // console.log(res);
        //     var a = (<any>window).Ionic.WebView.convertFileSrc(res.toURL());
        //     this.tempsubdeals[index].Logo = a;
        //   });
      }
      // console.log(this.items);
    });
  }

  goToStore(data) {
    this.sharedProvider.openBrowser(data);
  }

  toggleDisplay() {
    if (this.tempsubdeals.length !== this.items.length) {
      for (var ii = this.tempsubdeals.length; ii < this.items.length; ii++) {
        this.tempsubdeals.push(this.items[ii]);
          this.sharedProvider
            .downloadOnMemory(this.items[ii], "stores")
            .then((res: any) => {
              // console.log(res);
              var a = (<any>window).Ionic.WebView.convertFileSrc(res.toURL());
              this.tempsubdeals[ii].Logo = a;
            });
      }
    }
    this.showMore = !this.showMore;
  }
}
