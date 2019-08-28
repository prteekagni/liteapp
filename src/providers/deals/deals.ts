import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

const apiUrl =
  "https://my-json-server.typicode.com/elinfinitoindia/demoserver/";

@Injectable()
export class DealsProvider {
  constructor(public http: HttpClient) {
    console.log("Hello DealsProvider Provider");
  }

  // get store links
  getStoreLinks() {
    return this.http.get("https://reqres.in/api/users?page=" + "1");
  }

  getStoreCategory() {
    return this.http.get("https://api.myjson.com/bins/k5qvb");
  }

  getStoreSubCategory(data) {
    return;
  }

  getDealSubCategory(data) {
    return this.http.get(
      "http://localhost:52044/api/category/getsubcategory/" + data
    );
  }

  // get ads data
  getAdsData() {
    return this.http.get(apiUrl + "ads");
  }

  // get Deals Categories
  getDealsCategory() {
    return this.http.get("http://localhost:52044/api/category");
  }

  // get deals for category
  getDealsByCategory(data) {}

  // get Deal Details
  getDealDetail() {}

  //get product category
  getProductCategory() {
    return this.http.get(apiUrl + "productC");
  }

  // get products by category
  getProductByCategory() {}

  // get product detail
  getProductDetail() {
    return;
  }
}
