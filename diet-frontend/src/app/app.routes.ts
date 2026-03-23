import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SignupComponent } from './pages/auth/signup';
import { SigninComponent } from './pages/auth/signin';
import { HeroComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    component: HeroComponent,
  },
];
