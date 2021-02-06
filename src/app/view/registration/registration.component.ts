import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from './registration.service';
import {SuccessModalComponent} from '../global/success-modal/success-modal.component';
import {ErrorModalComponent} from '../global/error-modal/error-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('successModal') public successModal: SuccessModalComponent;
  @ViewChild('errorModal') public errorModal: ErrorModalComponent;

  registrationForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;

  constructor(private formBuilder: FormBuilder,
              private registrationService: RegistrationService,
              private router: Router) {
    this.registrationForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userRole: ['Manager'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      status: ['Active']
    });
  }

  ngOnInit(): void {

  }

  submitRegistrationForm() {

    for (const controller in this.registrationForm.controls) {
      this.registrationForm.get(controller).markAsTouched();
    }
    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationService.addManager(this.registrationForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.successModal.showModal('SUCCESS', res.message, '');
        } else {
          this.errorModal.showModal('ERROR', res.error, '');
        }
      }
      });
  }
  modalSuccess($event: any){
    this.router.navigate(['/login']);
  }
}
