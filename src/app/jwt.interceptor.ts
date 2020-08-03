import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { catchError, map } from 'rxjs/operators';

@Injectable(
)
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authenticationService.loadingSub.next(true)
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && request.url.includes("/login")) {
            this.router.navigate(["/landing"]);

        }
        else if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            return this.handlenextreq(request, next);
        }
        if (!currentUser) {
            return this.handlenextreq(request, next);
        }

    }


    handlenextreq(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(catchError((err: any) => {
            if (err.status === 401 || err.status === 403)
                this.authenticationService.onLogout();
            this.authenticationService.loadingSub.next(false);
            return of(err);
        })).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
                   this.authenticationService.loadingSub.next(false);
            }
            return evt;
        }));
    }
}