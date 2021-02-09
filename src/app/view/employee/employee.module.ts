import {NgModule} from '@angular/core';
import {EmployeeComponent} from './employee.component';
import {EmployeeAddEditComponent} from './employee-add-edit/employee-add-edit.component';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'employee-add',
    component: EmployeeAddEditComponent
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeAddEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    GlobalModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeAddEditComponent
  ]
})
export class EmployeeModule {
}
