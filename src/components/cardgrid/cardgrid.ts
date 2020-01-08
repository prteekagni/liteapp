import { Component, ViewChild, ElementRef, Output, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DealsProvider } from "../../providers/deals/deals";
import { take, tap, map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";
import { File } from "@ionic-native/file";
import { StorageProvider } from "../../providers/storage/storage";
import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
  keyframes
} from "@angular/animations";
import { Events } from "ionic-angular";

@Component({
  selector: "cardgrid",
  templateUrl: "cardgrid.html",
  animations: [
    trigger("btnanimation", [
      transition("more => less", [
        query(
          ":self",
          animate(
            "1s",
            keyframes([
              style({ transform: "scale3d(1, 1, 1)" }),
              style({ transform: "scale3d(1.25, 0.75, 1)" }),
              style({ transform: "scale3d(0.75, 1.25, 1)" }),
              style({ transform: "scale3d(1.15, 0.85, 1)" }),
              style({ transform: "scale3d(0.95, 1.05, 1)" }),
              style({ transform: "scale3d(1.05, 0.95, 1)" }),
              style({ transform: "scale3d(1.05, 0.95, 1)" }),
              style({ transform: "scale3d(1, 1, 1)" })
            ])
          )
        )
      ]),
      transition("less => more", [
        query(
          ":self",
          animate(
            "2s",
            keyframes([
              style({ transform: "scale3d(1, 1, 1)" }),
              style({ transform: "scale3d(1.25, 0.75, 1)" }),
              style({ transform: "scale3d(0.75, 1.25, 1)" }),
              style({ transform: "scale3d(1.15, 0.85, 1)" }),
              style({ transform: "scale3d(0.95, 1.05, 1)" }),
              style({ transform: " scale3d(1.05, 0.95, 1)" }),
              style({ transform: " scale3d(1.05, 0.95, 1)" }),
              style({ transform: "  scale3d(1, 1, 1)" })
            ])
          )
        )
      ])
    ])
  ]
})
export class CardgridComponent {
  text: string;
  items: any = [];
  showMore: boolean = false;
  tempsubdeals: any = [];
  copiedData: any;
  sharedProvider: any;
  btnstate: string = "more";
  @ViewChild("myrow", { read: ElementRef }) myrow: ElementRef;
  @ViewChild("mywrapper", { read: ElementRef }) mywrapper: ElementRef;
  @Input() topstores;
  myImgUrl = "assets/dealslocker1.png";
  constructor(
    private dealsProvider: DealsProvider,
    private sharedService: SharedProvider,
    private file: File,
    private storageService: StorageProvider,
    private events: Events
  ) {

   
    this.dealsProvider.getTopStores().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
      
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
      // console.log("Temp sub deals " + JSON.stringify(this.tempsubdeals));
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
    this.btnstate = this.btnstate == "less" ? "more" : "less";
    console.log("Btn State is " + this.btnstate);
  }

  onImageLoad(data) {
    console.log("loaded");
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    // this.topstores.subscribe((res:any)=>{
    //   console.log(res);
      
    // });
    // this.events.subscribe("topstores", res => {
    //   console.log("Event response " + res);
    // });
    
  }
}
