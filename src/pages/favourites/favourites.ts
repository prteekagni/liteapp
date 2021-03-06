import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { SharedProvider } from "../../providers/shared/shared";

const animationsOptions = {
  animation: "ios-transition",
  duration: 500
};

@IonicPage()
@Component({
  selector: "page-favourites",
  templateUrl: "favourites.html"
})
export class FavouritesPage {
  fav: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageProvider,
    public sharedService: SharedProvider
  ) {}

  ionViewDidLoad() {
    this.sharedService.createLoader();
    this.storageService.getDeals().then(res => {
      this.fav = res || [];

      this.fav.forEach(element => {
        element.time = "";
      });
      this.sharedService.dismissLoader();
    });
  }

  remove(data) {
    this.storageService.deleteDeals(data).then(res => {
      this.fav = res;
      this.fav.forEach(element => {
        element.time = "";
      });
    });
  }

  backPage() {
    //  this.nativeTrasnitions.curl(null).then(res=>{
    //    console.log('done')
    //  },err=>{
    //    console.log('err')
    //  })

    this.navCtrl.pop(animationsOptions);
  }
}
