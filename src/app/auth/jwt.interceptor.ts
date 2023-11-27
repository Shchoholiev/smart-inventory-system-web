import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const jwt = localStorage.getItem('accessToken');
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }

    return next.handle(request);
  }
}