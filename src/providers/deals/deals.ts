import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DealsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DealsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DealsProvider Provider');
  }

  // get store links 
  getStoreLinks(): Observable<any>{
    return
  }

  // get ads data 
  getAdsData() {
    
  }

  // get Deals Categories
  getDealsCategory() {
    
  }

  // get deals for category
  getDealsByCategory(data) {
    
  }

  // get Deal Details
  getDealDetail() {
    
  }

  //get product category
  getProductCategory() {
    
  }

  // get products by category
  getProductByCategory() {
    
  }

  // get product detail
  getProductDetail()
  {
    return
  }

  


}
