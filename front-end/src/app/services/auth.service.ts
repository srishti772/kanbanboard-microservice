import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '../interface/user.interface';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IError } from '../interface/error.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  private handleResponse(res: HttpResponse<IUser>): Observable<IUser> {
    if (res.status === 200 || res.status === 201) {
      const authResult = res.body as IUser;
      const authToken = res.headers.get('Authorization');

      if (authToken) {
        localStorage.setItem('id_token', authToken);
      }
      this.userSubject.next(authResult); // Update userSubject with user data
      return of(authResult);
    } else {
      return this.handleError(res.status, res.body);
    }
  }

  private handleError(status: number, body: any): Observable<never> {
    const error: IError = {
      status,
      message: body || 'Unknown error',
      showError: true,
    };
    return throwError(() => error);
  }

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        `${this.apiUrl}/login`,
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        switchMap((res: HttpResponse<IUser>) => this.handleResponse(res)),
        catchError((error) => this.handleError(error.status, error.error))
      );
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userSubject.next(null);
  }

  signup(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.apiUrl}/register`, user, { observe: 'response' })
      .pipe(
        switchMap((res: HttpResponse<IUser>) => this.handleResponse(res)),
        catchError((error) => this.handleError(error.status, error.error))
      );
  }
}
