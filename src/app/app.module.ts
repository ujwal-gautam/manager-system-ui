import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './view/manager/login/login.component';
import {RegistrationComponent} from './view/manager/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './view/service/jwt.interceptor';
import {CommonModule} from '@angular/common';
import {GlobalModule} from './view/global/global.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ForgetPasswordComponent } from './view/manager/forget-password/forget-password.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GlobalModule, BsDropdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
