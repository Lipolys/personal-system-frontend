import { Routes } from '@angular/router';
import { PacienteListComponent } from './features/paciente/paciente-list/paciente-list.component';
import {LoginFormComponent} from './features/login/login-form/login-form.component';
import {AppComponent} from './app.component';
import {SecurityGuard} from './authentication/security/security.guard';
import {MensageiroStatusComponent} from './features/mensageiro/mensageiro-status/mensageiro-status.component';
import { DashboardContainerComponent } from './features/dashboard/dashboard-container/dashboard-container.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'pacienteList', component: PacienteListComponent, canActivate: [SecurityGuard], data: {security: {roles: ['ROLE_PATIENT_LISTALL']}}},
  {path: 'mensageiro', component: MensageiroStatusComponent},
  { path: 'dashboard', component: DashboardContainerComponent }
];
