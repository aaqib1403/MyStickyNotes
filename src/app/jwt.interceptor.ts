import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';



@Injectable(
)
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if(currentUser && request.url.includes("/login")){
            this.router.navigate(["/landing"]);
            
        }
       else if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            return next.handle(request);
        }
        if(!currentUser){
            return next.handle(request);
        }
       

       
    }
}