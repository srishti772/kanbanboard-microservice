import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token from local storage
    const idToken = localStorage.getItem('id_token');
    
    // Define login and signup URL patterns to exclude from token addition
    const excludedUrls = ['/auth/login', '/auth/register'];

    // Check if the current request URL should not have the token
    if (idToken && !excludedUrls.some(url => req.url.includes(url))) {
      // Clone the request and add the Authorization header
      const cloned = req.clone({
        setHeaders: {
          Authorization: `${idToken}`
        }
      });
      console.log(`INSIDEEEEEEEEEEEE INTERCEPTOP Bearer ${idToken}`);

      return next.handle(cloned);
    } else {
      // Continue with the original request
      console.log(`INSIDEEEEEEEEEEEE INTERCEPTOP  ${idToken}`);

      return next.handle(req);
    }
  }
}
