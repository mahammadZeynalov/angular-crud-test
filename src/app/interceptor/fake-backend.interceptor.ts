import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    if (url.endsWith('/products') && method === 'GET') {
      return next.handle(req).pipe(delay(500));
    }
    if (url.endsWith('/products') && method === 'POST') {
      const { body } = req.clone();
      body.id = uuidv4();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    if (url.match(/\/products\/.*/) && method === 'DELETE') {
      console.log(req);
      return of(new HttpResponse({ status: 200, body: null })).pipe(delay(500));
    }
    if (url.match(/\/products\/.*/) && method === 'UPDATE') {
      console.log(req);
      return of(new HttpResponse({ status: 200, body: null })).pipe(delay(500));
    }
    return next.handle(req);
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
