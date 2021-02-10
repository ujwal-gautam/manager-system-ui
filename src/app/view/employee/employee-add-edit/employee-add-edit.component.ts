import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuccessModalComponent} from '../../global/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../global/error-modal/error-modal.component';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  @ViewChild('successModal') public successModal: SuccessModalComponent;
  @ViewChild('errorModal') public errorModal: ErrorModalComponent;

  employeeForm: FormGroup;
  mode: any;
  employee: any;
  employeeId: any;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
              private actRoute: ActivatedRoute,
              private router: Router) {
    this.employeeForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      emailId: ['', Validators.required],
      status: ['Active']
    });
  }

  ngOnInit(): void {

    this.employeeId = this.actRoute.snapshot.paramMap.get('id');

    if (this.employeeId) {
      this.mode = 'edit';
      this.employeeService.getEmployeeById(this.employeeId).subscribe(data => {
        this.employee = data;
        this.employeeForm = this.formBuilder.group({
          id: [],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          mobile: ['', Validators.required],
          address: ['', Validators.required],
          emailId: ['', Validators.required],
          status: ['Active']
        });

        this.employeeForm.patchValue(this.employee);
      });
    }
  }

  submitEmployeeForm() {

    for (const controller in this.employeeForm.controls) {
      this.employeeForm.get(controller).markAsTouched();
    }
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.mode == 'edit') {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  private updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value, this.employeeId).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSubmitted = res.success;
        if (res.success) {
          this.successModal.showModal('SUCCESS', res.message, '');
        } else {
          this.errorModal.showModal('ERROR', res.error, '');
        }
      }
    });
  }

  private addEmployee() {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSubmitted = res.success;
        if (res.success) {
          this.successModal.showModal('SUCCESS', res.message, '');
        } else {
          this.errorModal.showModal('ERROR', res.error, '');
        }
      }
    }, err => {
      console.log(err);
    });
  }

  modalSuccess() {
    this.router.navigate(['/employee']);
  }
}
