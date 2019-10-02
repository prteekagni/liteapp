import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SharedProvider } from "../providers/shared/shared";
import { AuthenticateProvider } from "../providers/authenticate/authenticate";
import { DealsProvider } from "../providers/deals/deals";
import { GooglePlus } from "@ionic-native/google-plus";
import { AppMinimize } from "@ionic-native/app-minimize";
import { SocialSharing } from "@ionic-native/social-sharing";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { HttpClientModule } from "@angular/common/http";
import { Network } from "@ionic-native/network";
import { OneSignal } from "@ionic-native/onesignal";
import { NativePageTransitions } from "@ionic-native/native-page-transitions";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule } from "@ionic/storage";
import { StorageProvider } from "../providers/storage/storage";
import { NotificationProvider } from "../providers/notification/notification";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Deeplinks } from "@ionic-native/deeplinks";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { Clipboard } from "@ionic-native/clipboard";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpErrorInterceptor } from "../providers/shared/interceptor";
import { CacheService } from "../providers/shared/cache";
import { CacheInterceptor } from "../providers/shared/cahce.interceptor";
import { InAppBrowser } from "@ionic-native/in-app-browser";
@NgModule({
  declarations: [MyApp],
  // schemas: [
  //   NO_ERRORS_SCHEMA
  // ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: "Go Back",
      iconMode: "ios",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabsPlacement: "bottom",
      pageTransition: "ios-transition",
      menuType: "reveal",
      spinner: "ios"
    }),
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
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
    NotificationProvider,
    Deeplinks,
    FirebaseDynamicLinks,
    Clipboard,
    FileTransfer,
    File,
    FileTransferObject,
    CacheService,
    InAppBrowser
  ],
  exports: []
})
export class AppModule {}
