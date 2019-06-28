import { Component } from '@angular/core';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
import { CordovaOptions, CordovaCheckOptions } from '@ionic-native/core';

/**
 * Generated class for the ShareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare  var cordova : {Cordova}


@Component({
  selector: 'share',
  templateUrl: 'share.html'
})
export class ShareComponent {

  text: string;

  constructor(
    private firebaseDynamicLinks: FirebaseDynamicLinks,

  ) {
    console.log('Hello ShareComponent Component');
    this.text = 'Hello World';
  }


  shareApp() {
    // cordova.plugins.firebase.dynamiclinks.createShortDynamicLink({
    //   link: "https://google.com"
    // }).then(function(url) {
    //   console.log("Dynamic link was created:", url);
    // });
    //   }
  }
}
