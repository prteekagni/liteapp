import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ItemSliding } from 'ionic-angular';

/**
 * Generated class for the DealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html',
})
export class DealsPage {



    @ViewChild(Content) content: Content;
  deals;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private renderer: Renderer
    ,
  private elem: ElementRef) {
 
  }

  ionViewDidLoad() {


    // let yOffset = document.getElementById("mobile").offsetTop;
    // console.log(yOffset)

    // setTimeout(() => {
    //   // this.content._scrollContent.nativeElement.scrollTo(0,yOffset
    //   //                                                      ,6000)
      
    // }, 1000)
    
    
    
    // let data = this.navParams.get('data');
    // if (data) {
   
    //   let yOffset = document.getElementById("mobile").offsetTop;
      
    // }
    // console.log(data);
    
    console.log('ionViewDidLoad DealsPage');
  }


  ionViewWillEnter() {
  
  }


  viewMore(data) {
   
  }

}
