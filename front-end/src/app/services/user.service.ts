import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '../interface/user.interface';
import { IError } from '../interface/error.interface';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8060/api/users';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();  // Load users initially
  }

  // Load all users and update the BehaviorSubject
  private loadUsers(): void {
    this.http.get<IUser[]>(this.apiUrl, { observe: 'response' }).pipe(
      tap((res: HttpResponse<IUser[]>) => {
        if (res.status === 200) {
          this.usersSubject.next(res.body || []);
        } else {
          this.handleError(res);
        }
      }),
      catchError(this.handleApiError.bind(this))
    ).subscribe();
  }

 // Get a single user by NUID
 getUserByNuid(nuid: string): Observable<IUser> {
  const url = `${this.apiUrl}/${nuid}`;
  return this.http.get<IUser>(url).pipe(
    catchError(this.handleApiError.bind(this))
  );
}

  // Refresh the user list
  refreshUsers(): void {
    this.loadUsers();
  }

  // Error handling method for API errors
  private handleError(response: HttpResponse<any>): void {
    const error: IError = {
      status: response.status,
      message: response.body ? response.body.toString() : 'Unknown error',
      showError: true,
    };
    console.error('Error:', error);
  }

  // Error handling method for HTTP errors
  private handleApiError(error: any): Observable<never> {
    const apiError: IError = {
      status: error.status || 500,
      message: error.error || 'An unknown error occurred',
      showError: true,
    };
    console.error('API Error:', apiError);
    return throwError(() => apiError);
  }
}
