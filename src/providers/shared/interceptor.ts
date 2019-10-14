import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { _throw as throwError } from "rxjs/observable/throw";
import { catchError } from "rxjs/operators";
import { SharedProvider } from "./shared";
import { Injectable } from "@angular/core";

const headers: HttpHeaders = new HttpHeaders({
  "Access-Control-Allow-Origin": "*"
});

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private SharedProvider: SharedProvider) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   headers: headers
    // });
    // const token: string = localStorage.getItem("token");

    // if (token) {
    request = request.clone({
      headers: request.headers.set("Access-Control-Allow-Origin", "*")
    });
    // }

    // if (!request.headers.has("Content-Type")) {
    //   request = request.clone({
    //     headers: request.headers.set("Content-Type", "application/json")
    //   });
    // }

    // request = request.clone({
    //   headers: request.headers.set("Accept", "application/json")
    // });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // alert(data);
        this.SharedProvider.handleError(error);
        return throwError(error);
      })
    );
  }
}
