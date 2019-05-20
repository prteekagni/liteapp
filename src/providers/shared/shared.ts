import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  loading;

  constructor(
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private socialSharing: SocialSharing
  
  ) {
    console.log('Hello SharedProvider Provider');
  }


    createToast(data) {
   
  }


  createLoader() {
    
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="../../assets/loader_icon.svg"/>
      `,
      dismissOnPageChange: true,
    });

   
    this.loading.present();
  }
  dismissLoader() {
    this.loading.dismiss();
    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    
  }


    shareApp(data) {
    this.socialSharing.share(data.message, data.subject, data.image, data.link).then(() => {
      console.log('share succesfull')
    });
  }



}
