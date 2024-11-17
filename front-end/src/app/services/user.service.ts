import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '../interface/user.interface';
import { IError } from '../interface/error.interface';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UpdateUserProfile } from '../interface/update-profile.interface';
import { UpdateUserPassword } from '../interface/update-password.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;
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

getCurrentUser(): Observable<IUser> {
  const url = `${this.apiUrl}/self`;
  return this.http.get<IUser>(url).pipe(
    catchError(this.handleApiError.bind(this))
  );
}

  // Refresh the user list
  refreshUsers(): void {
    this.loadUsers();
  }

  updateUserProfile(profileData: any): Observable<IUser> {
    const url = `${this.apiUrl}/self/profile`;
    return this.http.put<IUser>(url, profileData).pipe(
      tap((updatedUser) => {
        console.log('Profile updated successfully:', updatedUser);
        this.refreshUsers();  // Optionally refresh the user list if needed
      }),
      catchError(this.handleApiError.bind(this))
    );
  }
    // Update password for a user by NUID
    updateUserPassword(passwordData: UpdateUserPassword): Observable<IUser> {
      const url = `${this.apiUrl}/self/password`;
      return this.http.put<IUser>(url, passwordData).pipe(
        tap((updatedUser) => {
          console.log('Password updated successfully:', updatedUser);
        }),
        catchError(this.handleApiError.bind(this))
      );
    }

      // Delete user by NUID
  deleteUser(nuid: string): Observable<void> {
    const url = `${this.apiUrl}/${nuid}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        console.log(`User deleted with NUID: ${nuid}`);
        this.refreshUsers();  // Optionally refresh the user list after deletion
      }),
      catchError(this.handleApiError.bind(this))
    );
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
