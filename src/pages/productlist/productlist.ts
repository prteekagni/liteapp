import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Img } from 'ionic-angular';
import { updateImgs } from 'ionic-angular/umd/components/content/content';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage  {


  deals;
  de: any = [];
  @ViewChild(Content) _content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    console.log(this.navParams.get('type'));
  }


  ionViewDidLoad() {
   this.de =  JSON.parse( localStorage.getItem('Deal' || '[]'));
    console.log('ionViewDidLoad ProductlistPage');
  }


  ionViewWillEnter() {
    this.de = [
      {
        'name': 'p',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
       {
        'name': 'p1',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
        {
        'name': 'p2',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
         {
        'name': 'p3',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
          {
        'name': 'p4',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
           {
        'name': 'p5',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
            {
        'name': 'p6',
        'img':'http://elinfinitoindia.in/images/logo.png'
      },
             {
        'name': 'p7',
        'img':'../../assets/imgs/1.png'
      },
              {
        'name': 'p8',
        'img':'../../assets/imgs/1.png'
      },
               {
        'name': 'p9',
        'img':'../../assets/imgs/1.png'
      },
    ]
  }


  doInfinite(event) {
    alert('gello')
  }

  save() {
   
    var deal = {
      "name": "gdfgdfgfteek",
      "age":"55"
    }

    var deals = [];
    deals.push(deal);

    var de = JSON.parse(localStorage.getItem('Deal'));
    deals.push(de);
    de.forEach(element => {
      if (element.name === deal.name) {
          console.log('already present')
      }
      else {
        localStorage.setItem('Deal', JSON.stringify(deals));
      }
    });
  
  }

}
