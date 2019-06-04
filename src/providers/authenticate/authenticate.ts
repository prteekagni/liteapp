import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticateProvider {

  constructor(
    public http: HttpClient,
    public googlePlus: GooglePlus
  ) {
    console.log('Hello AuthenticateProvider Provider');
  }


  checkUserLogin() {
    if (localStorage.getItem('isLoggedIn') === "true") {
      return true;
    }
    else {
      return false;
    }
    
  }

  setUserLogin() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  setUserLogout() {
    this.googlePlus.logout().then(res => {
  
    });
    localStorage.setItem('isLoggedIn', '');
  }

 verifyOtp(data){
    return this.http.post("/VerifyOtp",data);
  }


  sendOtp(data) {
    return this.http.post("/users/ForgetPassword", data);
  }
}
