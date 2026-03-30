import { Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin';
import { SignupComponent } from './pages/auth/signup';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { GoalCalendarComponent } from './pages/dashboard/goal-calendar.component';
import { HeroComponent } from './pages/home/home';
import { MainStatsComponent } from './pages/dashboard/main-stats-component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: MainStatsComponent }, // The current dashboard cards
      { path: 'calendar', component: GoalCalendarComponent }, // The calendar component
    ],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', component: HeroComponent },
];
