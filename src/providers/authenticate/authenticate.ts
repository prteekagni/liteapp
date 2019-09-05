import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus";

@Injectable()
export class AuthenticateProvider {
  user;
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
    return this.http.post("/VerifyOtp", data);
  }

  sendOtp(data) {
    return this.http.post("/users/ForgetPassword", data);
  }

  // register user
  registerUser() {}

  // login user with email
  loginUser() {}

  //
}
