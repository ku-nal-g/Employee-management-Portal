import { AuthGuard } from './guards/auth.guard';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'employees-list',
    canActivate: [AuthGuard],
    component: EmployeesListComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  //wildcard routing
  {
    path: '**',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
