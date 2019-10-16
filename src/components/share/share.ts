import { Component } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing";

declare var cordova;

@Component({
  selector: "share",
  templateUrl: "share.html"
})
export class ShareComponent {
  text: string;

  constructor(private shareapp: SocialSharing) {
    console.log("sociualkshareing");
    var data = {
      message: "Now get great deals on one click",
      Url: "google",
      subject: "",
      image: ""
    };
    this.shareapp
      .share(data.message, data.subject, data.image, data.Url)
      .then(res => console.log(res));
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
    this.shareapp
      .share(data.message, data.subject, data.image, data.Url)
      .then(res => console.log(res));
  }
}
