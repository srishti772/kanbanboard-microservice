import { Routes } from '@angular/router';
import { SignupComponent } from './components/landing/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/landing/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
          { path: 'signup', component: SignupComponent },
          { path: 'login', component: LoginComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route within LandingComponent
        ]
      },
      { path: 'home', component: HomeComponent }, // HomeComponent outside of LandingComponent
      { path: '**', redirectTo: 'login' } 
];
