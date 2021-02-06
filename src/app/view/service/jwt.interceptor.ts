import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';
import { Router , RouterStateSnapshot} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;

        if(!this.authenticationService.isUserLoggedIn){
            this.authenticationService.logout();
        }

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        request = request.clone({
            setHeaders: {
                'Allow-Origin' : environment.allowOrigin,
                'Access-Control-Allow-Origin' : environment.allowOrigin,
            }
        });

        return next.handle(request);
    }
}
