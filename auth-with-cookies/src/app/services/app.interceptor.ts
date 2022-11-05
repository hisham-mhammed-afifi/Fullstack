import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();

    const newRequest = request.clone({
      withCredentials: true,
    });

    return next.handle(newRequest).pipe(
      tap(() => {
        const elapsed = Date.now() - started;
        console.warn(`request took ${elapsed} ms.`);
      })
    );
  }
}
