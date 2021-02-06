import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeList: any = [];

  constructor(private employeeService: EmployeeService
    , private router: Router) {
  }

  ngOnInit(): void {
    this.loadAllEmployeeList();
  }

  loadAllEmployeeList() {
    return this.employeeService.getAllEmployees().subscribe((data: {}) => {
      this.employeeList = data;
      console.log('this is emp list-> ', this.employeeList)
    });
  }

  addEmployee() {
    this.router.navigate(['employee/employee-add']);
  }

  delete(employee: number) {
    return this.employeeService.deleteEmployee(employee).subscribe((data: {}) => {
      this.ngOnInit();
    });
  }
}
