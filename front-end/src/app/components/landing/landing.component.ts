import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginComponent, SignupComponent, RouterModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {




}
