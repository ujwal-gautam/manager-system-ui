import {Injectable} from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = environment.apiUrl + 'manager';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }


  errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  addManager(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      );
  }

  updatePassword(emailId: any, data: any): Observable<any>{
    return this.http.put<any>(this.baseUrl + '/forget-password/' + emailId, JSON.stringify(data), this.httpOptions )
        .pipe(
            retry(1),
            catchError(this.errorHandle)
        );
  }
}
