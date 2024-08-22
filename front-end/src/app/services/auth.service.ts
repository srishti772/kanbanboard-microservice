import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '../interface/user.interface';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';

interface AuthError {
  status: number;
  message: string;
  showError: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = 'http://localhost:8060/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        `${this.apiUrl}/login`,
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        switchMap((res: HttpResponse<IUser>) => {
          // Check if response status is 200 OK
          if (res.status === 200) {
            const authResult = res.body as IUser;
            console.log("AUTH RES",authResult);
  
            const authToken = res.headers.get('Authorization');

            console.log('TOKEN**', authToken, res);
            if (authToken) {
              localStorage.setItem('id_token', authToken);
            }
            this.userSubject.next(authResult); // Update userSubject with user data
            console.log("fife",this.user$);

            return of(res.body as IUser);
          } else {
            const error: AuthError = {
              status: res.status,
              message: `${
                res.body || 'Unknown error'
              }`,
              showError: true,
            };
            return throwError(() => error);
          }
        }),
        catchError((error) => {
          // Handle errors from the API

          const authError: AuthError = {
            status: error.status || 500,
            message: error.error || 'An unknown error occurred',
            showError: true,
          };
          return throwError(() => authError);
        })
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userSubject.next(null);
  }

  signup(user: IUser): Observable<IUser> {
    return this.http
    .post<IUser>(
      `${this.apiUrl}/register`,
      user,
      { observe: 'response' }
    ).pipe(switchMap((res: HttpResponse<IUser>) => {
      // Check if response status is 200 OK
      if (res.status === 201) {
        const authResult = res.body as IUser;
         return of(res.body as IUser);
      } else {
        const error: AuthError = {
          status: res.status,
          message: `${
            res.body || 'Unknown error'
          }`,
          showError: true,
        };
        return throwError(() => error);
      }
    }),
    catchError((error) => {
      // Handle errors from the API

      const authError: AuthError = {
        status: error.status || 500,
        message: error.error || 'An unknown error occurred',
        showError: true,
      };
      return throwError(() => authError);
    })
  );
  }
}
