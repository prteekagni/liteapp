import { Component, ViewChild, ElementRef, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { take, tap, map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";
import { StorageProvider } from "../../providers/storage/storage";

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
  
  @ViewChild("myrow", { read: ElementRef }) myrow: ElementRef;
  @ViewChild("mywrapper", { read: ElementRef }) mywrapper: ElementRef;
  myImgUrl = "assets/dealslocker1.png";
  constructor(
    private dealsProvider: DealsProvider,
    private sharedService: SharedProvider,
    private file: File,
    private storageService: StorageProvider
  ) {
    this.dealsProvider.getTopStores().subscribe((res: any) => {
      this.items = res;
      for (let index = 0; index < 6 && this.items.length; index++) {
        this.tempsubdeals.push(this.items[index]);
        // this.tempsubdeals[index].Logo = "";
        // this.sharedService
        //   .checkDownloadedImage(this.tempsubdeals[index], "stores")
        //   .then(
        //     res => {
        //       if (res) {
        //         var nativeUrl = (<any>window).Ionic.WebView.convertFileSrc(
        //           this.file.externalDataDirectory +
        //             "images/" +
        //             this.tempsubdeals[index].Name +
        //             ".png"
        //         );
        //         if (nativeUrl.length > 0) {
        // this.tempsubdeals[index].Logo = nativeUrl;
        //   }
        // }
        // },
        // err => {
        //   this.sharedService
        //     .downloadOnMemory(this.tempsubdeals[index], "stores")
        //     .then((res: any) => {
        //       console.log(res);
        //       var a = (<any>window).Ionic.WebView.convertFileSrc(
        //         res.toURL()
        //       );
        //       this.tempsubdeals[index].Logo = a;
        //     });
        // }
        // );
      }
      console.log("Temp sub deals " + JSON.stringify(this.tempsubdeals));
    });
  }

  goToStore(data) {
    this.storageService.visitedStores(data).then((res: any) => {
      console.log(res);
    });
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
    console.log(this.myrow);
    var growDiv = this.myrow.nativeElement;
    if (growDiv.clientHeight == "150") {
      var wrapper =
        this.mywrapper.nativeElement.nextElementSibling.offsetHeight *
          (this.tempsubdeals.length / 3) +
        (this.tempsubdeals.length / 3 + 20);

      growDiv.style.height = wrapper + "px";
      console.log(growDiv.style.height);
    } else {
      growDiv.style.height = 150 + "px";
      console.log(growDiv.style.height);
    }
    this.showMore = !this.showMore;
  }

  onImageLoad(data) {
    console.log("loaded");
  }
}
