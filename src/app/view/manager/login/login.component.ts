import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {first} from 'rxjs/operators';
import {ErrorModalComponent} from '../../global/error-modal/error-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('errorModal') public errorModal: ErrorModalComponent;

  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';


  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/employee']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
      ]),
      password: ['', Validators.required],
      status: ['Active']
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/employee';

  }

  get f() { return this.loginForm.controls; }

  submitForm() {
    console.log('in submit login form');
    this.submitted = true;
    for (const controller in this.loginForm.controls) {
      this.loginForm.get(controller).markAsTouched();
    }

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;
    }

    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.id) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.errorModal.showModal('ERROR', data.error, '');
          }
        });
  }
}
