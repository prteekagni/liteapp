import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { take, tap, map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";

@Component({
  selector: "cardgrid",
  templateUrl: "cardgrid.html"
})
export class CardgridComponent {
  text: string;
  items: any = [];
  showMore: boolean = false;
  tempsubdeals: any = [];
  copiedData: any;
  sharedProvider: any;
  constructor(
    private dealsProvider: DealsProvider,
    private sharedService: SharedProvider,
    private file: File
  ) {
    this.dealsProvider.getTopStores().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
      
      for (let index = 0; index < this.items.length && 6; index++) {
        this.tempsubdeals.push(this.items[index]);
        this.sharedService
          .checkDownloadedImage(this.tempsubdeals[index], "stores")
          .then(res => {
            if (res) {
              var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
                this.file.externalDataDirectory +
                  "images/" +
                  this.tempsubdeals[index].Name +
                  ".png"
              );
              if (nativeUrl.length > 0) {
                this.tempsubdeals[index].Logo = nativeUrl;
              }
            }
          }, err=>{
              this.sharedService
                .downloadOnMemory(this.tempsubdeals[index], "stores")
                .then((res: any) => {
                  console.log(res);
                  var a = (<any>window).Ionic.WebView.convertFileSrc(
                    res.toURL()
                  );
                  this.tempsubdeals[index].Logo = a;
                });
          });
      }
    });
  }

  goToStore(data) {
    this.sharedService.openBrowser(data);
  }

  toggleDisplay() {
    if (this.tempsubdeals.length !== this.items.length) {
      for (var ii = this.tempsubdeals.length; ii < this.items.length; ii++) {
        this.tempsubdeals.push(this.items[ii]);
        this.sharedService
          .checkDownloadedImage(this.tempsubdeals[ii], "stores")
          .then(
            res => {
              if (res) {
                var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
                  this.file.externalDataDirectory +
                    "images/" +
                    this.tempsubdeals[ii].Name +
                    ".png"
                );
                if (nativeUrl.length > 0) {
                  this.tempsubdeals[ii].Logo = nativeUrl;
                }
              }
            },
            err => {
              this.sharedService
                .downloadOnMemory(this.tempsubdeals[ii], "stores")
                .then((res: any) => {
                  console.log(res);
                  var a = (<any>window).Ionic.WebView.convertFileSrc(
                    res.toURL()
                  );
                  this.tempsubdeals[ii].Logo = a;
                });
            }
          );
      }
    }
    this.showMore = !this.showMore;
  }
}
