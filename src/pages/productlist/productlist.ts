import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Img } from 'ionic-angular';
import { updateImgs } from 'ionic-angular/umd/components/content/content';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  timeStarts;
  date;
  de: any = [];
  lnotification: any = [];
  @ViewChild(Content) _content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
  private localNotifications : LocalNotifications) {
    
    console.log(this.navParams.get('type'));
  }


  ionViewDidLoad() {
   this.de =  JSON.parse( localStorage.getItem('Deal' || '[]'));
    console.log('ionViewDidLoad ProductlistPage');
  }


  ionViewWillEnter() {
  //  this.de = JSON.parse(localStorage.getItem('Deal' || '[]'));
  //  console.log('ionViewDidLoad ProductlistPage');
    
    
    
    this.de = [
      {
        "title": "Amazon",
        "Description": "hi this is description and is must of it",
        "image": "../../assets/imgs/logo.png",
        "link":"https://amazon.in"
      },
      {
        "title": "Amazon1",
        "Description": "hi this is description and is must of it",
        "image": "../../assets/imgs/logo.png",
        "link":"https://amazon.in"
      },
      {
        "title": "Amazon2",
        "Description": "hi this is description and is must of it",
        "image": "../../assets/imgs/logo.png",
        "link":"https://amazon.in"
      },
      {
        "title": "Amazon3",
        "Description": "hi this is description and is must of it",
        "image": "../../assets/imgs/logo.png",
        "link":"https://amazon.in"
      },
    ]
   
  }


  doInfinite(event) {
    alert('gello')
  }

  save() {
   
    var deal = {
      "name": "gdfgdfgfteek",
      "age": "55",
      "reminder":"3:59"
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


  setData(data) {
   var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
   this.date = new Date(utc + " " + this.timeStarts);
   console.log(this.date)
   console.log(this.timeStarts)
   let notification: any = {
     id: data,
     title: 'Do you want to go see a movie tonight?',
     actions: [{ id: 'yes', title: 'Reschedule' }],
     trigger: { at: this.date },
     led: 'FF0000',
   }
   
   
   this.lnotification = JSON.parse(localStorage.getItem('notification')) || [];
   this.lnotification.push(notification);
   
   localStorage.setItem('notification', JSON.stringify(this.lnotification));
   
   
   console.log(this.lnotification);
   this.localNotifications.schedule(this.lnotification);
   
  }

}
