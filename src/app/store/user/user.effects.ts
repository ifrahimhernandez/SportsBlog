import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateModel, LogInFailed, LogInSuccess, LogOut } from './../user/user.action';
import { User } from '@app/shared/types/user.interface';
import { AuthService } from '../../shared/services/authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { LogIn } from './user.action';


@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private actions$: Actions,
        private AuthService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    LogIn$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(LogIn),
            switchMap((payload: AuthStateModel) => this.AuthService.login(payload.username, payload.password).pipe(
                map((user: User) => {
                    console.log("map")
                    this.AuthService.setUserLocalStorage(user);
                    return LogInSuccess({ user: user });
                }),
                tap(() => {
                    console.log("tap")
                    this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/dashboard');
                }),
                catchError((e): any => {
                    return LogInFailed(e.error);
                })
            ))
        )
    );

    LogOut$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LogOut),
                tap(() => {
                    // Perform any necessary cleanup actions here
                    // Clear any user-specific data from the state
                    this.AuthService.logout()
                })
            ),
        { dispatch: false }
    );
}