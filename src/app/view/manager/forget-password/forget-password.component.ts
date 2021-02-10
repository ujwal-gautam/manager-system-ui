import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SuccessModalComponent} from "../../global/success-modal/success-modal.component";
import {ErrorModalComponent} from '../../global/error-modal/error-modal.component';
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('successModal') public successModal: SuccessModalComponent;
  @ViewChild('errorModal') public errorModal: ErrorModalComponent;

  forgetPassForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;
  constructor(private formBuilder: FormBuilder,
              private registrationService: RegistrationService,
              private router: Router) { }

  ngOnInit(): void {
    this.forgetPassForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitNewPassword(){
    for (const controller in this.forgetPassForm.controls) {
      this.forgetPassForm.get(controller).markAsTouched();
    }
    if (this.forgetPassForm.invalid) {
      return;
    }
    this.registrationService.updatePassword(this.forgetPassForm.value.email, this.forgetPassForm.value).subscribe((res: any) => {
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

  modalSuccess(){
    this.router.navigate(['/login']);
  }
}
