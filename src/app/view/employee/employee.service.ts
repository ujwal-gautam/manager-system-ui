import {Injectable} from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiUrl + 'employee';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  getAllEmployees() {
    return this.http.get<any>(this.baseUrl + '/list')
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
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

  deleteEmployee(id: number) {
    return this.http.delete<any>(this.baseUrl + '/' +id + '/delete')
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }

  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + employeeId)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }


  addEmployee(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      );
  }

  updateEmployee(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + id + '/update', JSON.stringify(data), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.errorHandle)
        );
  }
}
