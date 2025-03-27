import { Routes } from '@angular/router';
import { PacienteListComponent } from './features/paciente/paciente-list/paciente-list.component';
import {LoginFormComponent} from './features/login/login-form/login-form.component';
import {AppComponent} from './app.component';
import {SecurityGuard} from './authentication/security/security.guard';
import {AnamneseListComponent} from './features/anamnese/anamnese-list/anamnese-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'pacienteList', component: PacienteListComponent, canActivate: [SecurityGuard], data: {security: {roles: ['ROLE_PATIENT_LISTALL']}}},
  {path: 'anamneseList', component: AnamneseListComponent, canActivate: [SecurityGuard], data: {security: {roles: ['ROLE_ANAMNESE_LISTALL']}}},
];
