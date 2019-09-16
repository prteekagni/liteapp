import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { _throw as throwError } from "rxjs/observable/throw";
import { catchError, tap } from "rxjs/operators";
import { SharedProvider } from "./shared";
import { Injectable } from "@angular/core";
import { CacheService } from "./cache";
import { of } from "rxjs/observable/of";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cahceService: CacheService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token: string = localStorage.getItem("token");

    // if (token) {
    //   request = request.clone({
    //     headers: request.headers.set("Authorization", "Bearer " + token)
    //   });
    // }

    // if (!request.headers.has("Content-Type")) {
    //   request = request.clone({
    //     headers: request.headers.set("Content-Type", "application/json")
    //   });
    // }

    // request = request.clone({
    //   headers: request.headers.set("Accept", "application/json")
    // });

    if (request.method != "get") {
      console.log("invalidate cache");
      this.cahceService.invalidateChache();
      return next.handle(request);
    }

    const cahceResponse: HttpResponse<any> = this.cahceService.get(request.url);

    if (cahceResponse) {
      console.log("from icache");
      return of(cahceResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log("adding item to cahce");
          this.cahceService.put(request.url, event);
        }
      })
    );
  }
}
