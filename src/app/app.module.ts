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
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';
import { NotificationProvider } from '../providers/notification/notification';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
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
    LocalNotifications,
    Network,
    OneSignal,
    NativePageTransitions,
    StorageProvider,
    NotificationProvider
    
  ]
})
export class AppModule {}
