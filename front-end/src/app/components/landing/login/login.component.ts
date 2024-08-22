import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/),
  ]);

  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  error: { status: number; message: string; showError: boolean } | null = null;


  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  loading : boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {}

  onLogin(event: Event): void {
    event.preventDefault();
    console.log('INSIDE LOGIN');
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      

      if (email && password) {
        // Proceed with login logic
        this.loading=true;
        this.authService.login(email, password).subscribe({
          next: (user) => {
            console.log(user);
          this.error = null;
          this.router.navigate(['/home']);

          },
          error: (err) => {
           
            this.error = {
              status: err.status || 500,
              message: err.message || 'An unknown error occurred. Please try again.',
              showError: true,
            };
          },
        });

        this.loading = false;
      } else {
        console.error('Email or password is missing');
      }
    }
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
