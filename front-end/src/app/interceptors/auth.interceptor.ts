import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    
    const excludedUrls = ['/auth/login', '/auth/register'];

    if (idToken && !excludedUrls.some(url => req.url.includes(url))) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `${idToken}`
        }
      });

      return next.handle(cloned);
    } else {

      return next.handle(req);
    }
  }
}
