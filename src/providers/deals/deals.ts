import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, filter, mergeMap, tap } from "rxjs/operators";
import { ReplaySubject } from "rxjs";

const apiUrl = "http://13.235.82.211/api/";

// const apiUrl = "http://localhost:5000/api/";

@Injectable()
export class DealsProvider {
  storesdata: ReplaySubject<any> = new ReplaySubject(1);

  constructor(public http: HttpClient) {}

  // get all category
  getAllCategory() {
    return this.http.get(apiUrl + "category");
  }

  // get stores by id
  getStores(id) {
    return this.http.get(apiUrl + "stores/getStores/" + id);
  }

  // get fav stores
  getTopStores() {
    return this.http
      .get(apiUrl + "stores")
      .pipe(map((res: any) => res.filter((resp: any) => resp.isFav == true)));
  }

  // get all stores
  getAllStores() {
    return this.http
      .get(apiUrl + "stores")
      .pipe(map((res: any) => res.filter(resp => resp.StoreType !== 0)))
      .subscribe((res: any) => {
        this.storesdata.next(res);
      });
  }

  getAllStoresLink(){
    return this.http
    .get(apiUrl + "stores");
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
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 11)));
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

  GetProductsByCategory(id){
    return this.http.get(apiUrl + "product/GetProductsByCategory/" + id);
  }

  getDealSubCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 11)));
  }

  // get deals for category
  getDealsByCategory(data) {
    return this.http.get(apiUrl + "deals/getDealsByCategory/" + data);
  }

  getDealsBySubCategory(data){
    return this.http.get(apiUrl + "deals/getDealsByParentCategory/" + data);
  }

  // get Deal Details
  getDealDetail() {}

  // get ads data
  getAdsData() {
    return this.http
      .get(apiUrl + "stores")
      .pipe(map((res: any) => res.filter((resp: any) => resp.StoreType == 15)));
  }

  //get product category
  getProductCategory() {
    return this.http
      .get(apiUrl + "category")
      .pipe(map((res: any) => res.filter(resp => resp.CatType == 4)));
  }

  getProductSubCategory(data) {
    console.log("From Deals grid " + data);

    return this.http.get(apiUrl + "category/GetSubCategory/" + data);
  }

  // get products by category
  getProductByCategory(data) {
    return this.http.get(apiUrl + "product/", data.ID);
  }

  // get product detail
  getProductDetail() {
    return;
  }

  getTopBrands() {
    return this.http
      .get(apiUrl + "stores")
      .pipe(
        map((res: any) => res.filter((resp: any) => resp.StoreType == 100))
      );
  }

  getBrandsByCategory(data) {
    return this.http.get(apiUrl + "brand/" + data);
  }

  getDealByID(data) {
    return this.http.get(apiUrl + "deals/ " + data);
  }


  getAllDeals(){
    return this.http.get(apiUrl + "deals")
  }
}
