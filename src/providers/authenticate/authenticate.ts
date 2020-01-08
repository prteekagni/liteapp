import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus";
import { getAllDebugNodes } from "@angular/core/src/debug/debug_node";

@Injectable()
export class AuthenticateProvider {
  user;
  apiUrl = "http://13.235.82.211/api/";
  constructor(public http: HttpClient, public googlePlus: GooglePlus) {}

  checkUserLogin() {
    if (this.getUserDetail() && this.getUserLogin() === "true") {
      return true;
    } else {
      return false;
    }
  }

  setUserLogin() {
    localStorage.setItem("isLoggedIn", "true");
  }

  getUserLogin() {
    return localStorage.getItem("isLoggedIn");
  }

  setUserDetails(user) {
    console.log(user.Result);
    localStorage.setItem("User", JSON.stringify(user));
  }

  getUserDetail() {
    return localStorage.getItem("User");
  }

  setUserLogout() {
    // this.googlePlus.logout().then(res => {});
    localStorage.setItem("isLoggedIn", "");
  }

  setloginStatus() {
    localStorage.setItem("GoogleLogin", "true");
  }

  getloginStatus() {
    return localStorage.getItem("GoogleLogin");
  }

  setToken(data) {
    localStorage.setItem("Token", JSON.stringify(data));
  }

  getToken() {
    localStorage.getItem("Token");
  }
  verifyOtp(data) {
    return this.http.post(this.apiUrl + "VerifyOtp", JSON.stringify(data));
  }

  sendOtp(data) {
    return this.http.post(
      this.apiUrl + "users/ForgetPassword",
      JSON.stringify(data),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }
    );
  }

  // register user
  registerUser(registerdata) {
    return this.http.post(this.apiUrl + "users", registerdata);
  }

  // login user with email
  loginUser(logindata) {
    return this.http.post(this.apiUrl + "users/Login", logindata);
  }

  logoutUser() {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("User", "");
    localStorage.setItem("isGLogin", "");
  }

  isGoogleLogin(){
    localStorage.setItem("isGLogin", "true");
  }

  checkGLogin(){
    return localStorage.getItem("isGLogin");
  }
}
