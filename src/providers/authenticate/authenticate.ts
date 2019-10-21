import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus";

@Injectable()
export class AuthenticateProvider {
  user;
  apiUrl = "http://192.168.225.45:52044/api/";
  constructor(public http: HttpClient, public googlePlus: GooglePlus) {}

  checkUserLogin() {
    console.log(JSON.parse(localStorage.getItem("User")));
    return (
      localStorage.getItem("isLoggedIn") === "true" &&
      JSON.parse(localStorage.getItem("User"))
    );
    // return true;
  }

  setUserLogin() {
    localStorage.setItem("isLoggedIn", "true");
  }

  setUserDetails(user) {
    localStorage.setItem("User", JSON.stringify(user));
  }

  setUserLogout() {
    // this.googlePlus.logout().then(res => {});
    localStorage.setItem("isLoggedIn", "");
  }

  verifyOtp(data) {
    return this.http.post(this.apiUrl+ "VerifyOtp", JSON.stringify(data));
  }

  sendOtp(data) {
    return this.http.post(this.apiUrl + "users/ForgetPassword", JSON.stringify(data), {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }

  // register user
  registerUser() {}

  // login user with email
  loginUser() {}

  //
}
