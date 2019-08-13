import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ItemSliding, Platform, Events } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { HttpClient } from '@angular/common/http';
import { DealsProvider } from '../../providers/deals/deals';

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
  subcategory: any = [];
  mobiless;
  mfashion;

  public mensf;
  public mobile: boolean;
  public mensfashion;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer,
    private elem: ElementRef,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private events: Events,
    private http: HttpClient,
    private dealsprovider: DealsProvider
  ) {
  
  }

  ionViewWillEnter() {
    // this.mobile = true;
   
    
    // this.dealsprovider.getDealsCategory().subscribe(res => {
    //   this.deals = res;
    //   // this.mfashion = this.deals.filter(x => x.Category == "MF");
    // })
    console.log('willenter')

    this.deals = [
      {
        "id": "1",
        "category": "Mobile",
        "view":"slide"
      },
      {
        "id": "2",
        "category": "MensFashion",
        "view":"square"
      },
      {
        "id":"3",
        "category": "WomenFashion",
        "view":"square"
      }
    ]
    
  }

  scrollHandler(event) {
   
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
  viewMore(data) {

  }

  goTo() {
    this.navCtrl.push('ProductlistPage');
  }

}
