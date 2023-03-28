import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogOut } from '@app/store/user/user.action';
import { Store } from '@ngrx/store';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.store.dispatch(LogOut());
            }

            const error = err.message || err.statusText;
            return throwError(error);
        }))
    }
}