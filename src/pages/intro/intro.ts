import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide, Slides } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-intro",
  templateUrl: "intro.html"
})
export class IntroPage {

  @ViewChild(Slides) slides : Slides
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad IntroPage");
    //  this.navCtrl.setRoot("TabsPage");
  }

  gotToHome() {
    this.navCtrl.setRoot("TabsPage");
  }

  goToNextSlide() {
  this.slides.slideNext(500);
  }
}
