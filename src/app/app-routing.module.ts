import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {RegistrationComponent} from "./view/registration/registration.component";
import {RouteGuardService} from "./view/service/route-guard.service";


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
