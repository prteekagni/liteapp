import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {


  deals;
  timeStarts;
  date;
  de: any = [];
  lnotification: any = [];
  @ViewChild(Content) _content: Content;
  des;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private localNotifications: LocalNotifications) {
    console.log(this.navParams.get('type'));
  }

  ionViewDidLoad() {
    this.de = JSON.parse(localStorage.getItem('deal' || '[]'));
    this.de.forEach(element => {
      element.time = ""
    });

    console.log(this.de);

    console.log('ionViewDidLoad ProductlistPage');
  }

  ionViewWillEnter() {
    //  this.de = JSON.parse(localStorage.getItem('Deal' || '[]'));
    //  console.log('ionViewDidLoad ProductlistPage');  
  }

  doInfinite() {
    alert('gello')
  }

  save() {

    var deal = {
      "name": "gdfgdfgfteek",
      "age": "55",
      "reminder": "3:59"
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
    var index = 0;
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    this.date = new Date(utc + " " + data.time);
    console.log(this.date);
    console.log(data.time);


    // this.de.forEach(element => {
    
    //   if (element.title == data.title) {
    //     element.time = data.time  
    //     console.log(index);
    //     var a = JSON.parse(localStorage.getItem('deals'));
  
        
    //   }
    //   ++index;
    // });

    // console.log(this.de);




    // let notification: any = {
    //   id: data,
    //   title: 'Do you want to go see a movie tonight?',
    //   actions: [{ id: 'yes', title: 'Reschedule' }],
    //   trigger: { at: this.date },
    //   led: 'FF0000',
    // }


    // this.lnotification = JSON.parse(localStorage.getItem('notification')) || [];
    // this.lnotification.push(notification);

    // localStorage.setItem('notification', JSON.stringify(this.lnotification));


    // console.log(this.lnotification);
    // this.localNotifications.schedule(this.lnotification);

  }

}
