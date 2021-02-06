import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  authenticateUrl: string = environment.apiUrl + 'authenticate';
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    // // console.log('before ' + this.isUserLoggedIn());
    // if (userName === 'rinkesh' && password === '123') {
    //   sessionStorage.setItem('authenticaterUser', userName);
    //   // console.log('after ' + this.isUserLoggedIn());
    //   return true;
    // }
    // return false;

    console.log('in login service url is -> ', this.authenticateUrl)
    return this.httpClient.post<any>(this.authenticateUrl, {email, password})
      .pipe(map(dataMap => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (dataMap.manager) {
          sessionStorage.setItem('currentUser', JSON.stringify(dataMap.manager));
          let tokenStr = 'Bearer ' + dataMap.manager.token;
          sessionStorage.setItem('token', tokenStr);

          this.currentUserSubject.next(dataMap.manager);
          return dataMap.manager;
        } else {
          return dataMap;
        }
      }));

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('currentUser')
    //console.log(!(user === null))
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

}
