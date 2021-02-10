import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./view/manager/login/login.component";
import {RegistrationComponent} from "./view/manager/registration/registration.component";
import {RouteGuardService} from "./view/service/route-guard.service";
import {ForgetPasswordComponent} from "./view/manager/forget-password/forget-password.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: {
      title: 'Registration Page'
    }
  },

  {
    path: 'employee',
    canActivate: [RouteGuardService],
    loadChildren: () => import('./view/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
