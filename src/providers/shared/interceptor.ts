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
import { catchError } from "rxjs/operators";
import { SharedProvider } from "./shared";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private SharedProvider: SharedProvider) {}
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

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // alert(data);
        this.SharedProvider.handleError(error);
        return throwError(error);
      })
    );
  }
}
