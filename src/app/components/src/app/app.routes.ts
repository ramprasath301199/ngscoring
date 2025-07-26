import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTeamsComponent } from './components/add-teams/add-teams.component';
import { NewMactchComponent } from './components/new-mactch/new-mactch.component';
import { AddPlayersComponent } from './components/add-players/add-players.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { ScoringComponent } from './components/scoring/scoring.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'add-team',
    component: AddTeamsComponent,
  },
  {
    path: 'new-match',
    component: NewMactchComponent,
  },
  {
    path: 'add-player',
    component: AddPlayersComponent,
  },
  {
    path: 'scoring',
    component: ScoringComponent,
  },
];
