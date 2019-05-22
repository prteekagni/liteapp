import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SharedProvider } from '../providers/shared/shared';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { DealsProvider } from '../providers/deals/deals';
import { GooglePlus } from '@ionic-native/google-plus';
import { AppMinimize } from '@ionic-native/app-minimize'
import { SocialSharing } from '@ionic-native/social-sharing';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedProvider,
    AuthenticateProvider,
    DealsProvider,
    GooglePlus,
    AppMinimize,
    SocialSharing,
    LocalNotifications
  ]
})
export class AppModule {}
