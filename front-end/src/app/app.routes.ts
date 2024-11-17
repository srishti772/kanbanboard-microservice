import { Routes } from '@angular/router';
import { SignupComponent } from './components/landing/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/landing/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BoardComponent } from './components/task/board/board.component';
import { ChartsComponent } from './components/task/charts/charts.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
          { path: 'signup', component: SignupComponent },
          { path: 'login', component: LoginComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route within LandingComponent
          { path: '', component: HomeComponent }, // Home route
        ]
      },
      {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: 'board', component: BoardComponent },
          { path: 'charts', component: ChartsComponent },
          { path: 'profile', component: ProfileComponent },

          { path: '', redirectTo: 'board', pathMatch: 'full' },
        ]
      }, 
      { path: '**', redirectTo: 'login' } 
];
