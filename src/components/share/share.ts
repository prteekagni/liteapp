import { Component } from "@angular/core";

declare var cordova;

@Component({
  selector: "share",
  templateUrl: "share.html"
})
export class ShareComponent {
  text: string;

  constructor() {
    console.log("sociualkshareing");
    var data = {
      message: "Now get great deals on one click",
      Url: "google",
      subject: "",
      image: ""
    };
   
  }

  shareApp() {
    cordova.plugins.firebase.dynamiclinks
      .createShortDynamicLink({
        link: "https://google.com"
      })
      .then(function(url) {
        console.log("Dynamic link was created:", url);
        var data = {
          message: "Now get great deals on one click",
          Url: url,
          subject: "",
          image: ""
        };
        this.shareApplication(data);
      });
  }

  shareApplication(data) {
 
  }
}
