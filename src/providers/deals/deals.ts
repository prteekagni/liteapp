import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, filter, mergeMap, tap } from "rxjs/operators";
import { Category } from "../../models/category";
import { ProductsPage } from "../../pages/products/products";
import { Subject, ReplaySubject } from "rxjs";

const apiUrl = "http://192.168.225.45:52044/api/";

@Injectable()
export class DealsProvider {
  storesdata: ReplaySubject<any> = new ReplaySubject(1);

  constructor(public http: HttpClient) {
    console.log("Hello DealsProvider Provider");
  }

  getAllCategory() {
    return this.http.get(apiUrl + "category");
  }

  getStores(id) {
    return this.http.get(apiUrl + "stores/getStores/" + id);
  }

  getTopStores(){
    return this.http
      .get(apiUrl + "stores")
      .pipe(map((res: any) => res.filter((resp: any) => resp.isFav == true)))
  }
  getAllStores() {
    return this.http.get(apiUrl + "stores").subscribe((res: any) => {
      this.storesdata.next(res);
    });
  }

  // get store links
  getSubStores(mid, id) {
    return this.http.get(apiUrl + "stores/getSubStores/" + mid + "/" + id);
  }

  getStoreCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 1)));
  }

  getFeatureStore() {
    return this.http.get(apiUrl + "category");
    // .pipe(map((res: any) => res.filter(resp => resp.CatType == 2)));
  }

  getStoreSubCategory(data) {
    return this.http.get(apiUrl + "category/GetSubCategory/" + data);
  }

  // get Deals Categories
  getDealsCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 3)));
  }

  getDealBySubCategory(id) {
    return this.http.get(apiUrl + "category/getDealsSubCategory/" + id);
  }

  getDealSubCategory(data) {
    return this.http.get(apiUrl + "category/GetSubCategory/" + data);
    // .pipe(map((res: any) => res.filter(resp => resp.CatType == 2)));
  }

  // get deals for category
  getDealsByCategory(data) {
    console.log(data);
    return this.http.post(apiUrl + "deals/getDealsByCategory/" + data, "");
  }

  // get Deal Details
  getDealDetail() {}

  // get ads data
  getAdsData() {
    return this.http.get(apiUrl + "ads");
  }

  //get product category
  getProductCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 8)));
  }

  // get products by category
  getProductByCategory(data) {
    return this.http.get(apiUrl + "products", data);
  }

  // get product detail
  getProductDetail() {
    return;
  }

  getTopBrands() {
    return this.http.get(apiUrl + "brand");
  }
}
