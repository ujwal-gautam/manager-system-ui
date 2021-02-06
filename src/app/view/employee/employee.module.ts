import {NgModule} from '@angular/core';
import {EmployeeComponent} from "./employee.component";
import {EmployeeAddEditComponent} from "./employee-add-edit/employee-add-edit.component";
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'employee-add',
    component: EmployeeAddEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  declarations: [
    EmployeeComponent,
    EmployeeAddEditComponent
  ]
})
export class EmployeeModule {
}
