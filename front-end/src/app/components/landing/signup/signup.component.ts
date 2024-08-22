import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '../../../interface/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  readonly nuid = new FormControl('', [
    Validators.required,
    Validators.maxLength(9),
    Validators.minLength(9),
    Validators.pattern(/^\d{9}$/),

  ]);

  readonly firstName = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-Z\s]+$/),  // Only alphabets and spaces

  ]);

  readonly lastName = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-Z\s]+$/),  // Only alphabets and spaces


  ]);

  readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/),

  ]);

  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);


  signupForm = new FormGroup({
    nuid: this.nuid,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
  });

  error: { status: number; message: string; showError: boolean } | null = null;


  ngOnInit(): void {}

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Map form values to IUser
      const newUser: IUser = {
        nuid: this.signupForm.value.nuid ?? '',
        firstName: this.signupForm.value.firstName ?? '',
        lastName: this.signupForm.value.lastName ?? '',
        email: this.signupForm.value.email ?? '',
        password: this.signupForm.value.password ?? '',
      };

      this.authService.signup(newUser).subscribe({
        next: (response) => {
          console.log('Sign-up successful', response);
          // Redirect to login page on successful sign-up
          this.error=null;
          this.redirectToLogin();
        },
        error: (err) => {
          console.error('Sign-up error', err);
          // Handle sign-up error (show error message to user)

          this.error = {
            status: err.status || 500,
            message: err.message?.message?.[0] || 'An unknown error occurred. Please try again.',
            showError: true,
          };
          console.log(this.error.message);

        }
      });

      
  } console.log(this.firstName);
}


redirectToLogin(): void {
  this.router.navigate(['/login']); 
}

}
