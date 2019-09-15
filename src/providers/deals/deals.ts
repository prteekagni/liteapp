import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, filter, mergeMap } from "rxjs/operators";
import { Category } from "../../models/category";

const apiUrl = "http://192.168.225.36:52044/api/";

@Injectable()
export class DealsProvider {
  constructor(public http: HttpClient) {
    console.log("Hello DealsProvider Provider");
  }

  // get store links
  getStores(data) {
    return this.http.get(apiUrl + "stores/", data);
  }

  getStoreCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 1)));
  }

  getStoreSubCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 1)));
  }

  // get Deals Categories
  getDealsCategory(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:52044/api/category");
  }

  getDealSubCategory() {
    return this.http.get(apiUrl + "category");
  }

  // get deals for category
  getDealsByCategory(data) {}

  // get Deal Details
  getDealDetail() {}

  // get ads data
  getAdsData() {
    return this.http.get(apiUrl + "ads");
  }

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
