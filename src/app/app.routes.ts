import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { GestioneDipendentiComponent } from './pages/gestione-dipendenti/gestione-dipendenti.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gestione/dipendenti', component: GestioneDipendentiComponent },
];
