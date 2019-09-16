import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the ProviderSharedCacheserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheService {
  private request: any = {};

  constructor() {}

  put(url, response: HttpResponse<any>): void {
    this.request[url] = response;
  }

  get(url: string): HttpResponse<any> | undefined {
    return this.request[url];
  }

  invalidateUrl(url: string): void {
    this.request[url] = undefined;
  }

  invalidateChache(): void {
    this.request = {};
  }
}
