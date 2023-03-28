import { createAction, props } from '@ngrx/store';
import { User } from '@app/shared/types/user.interface';

export interface AuthStateModel {
    username: string;
    password: string;
}

export const LogIn = createAction(
    '[AUTH] Login',
    props<AuthStateModel>()
);

export const LogOut = createAction(
    '[AUTH] Logout'
);

export const LogInSuccess = createAction(
    '[AUTH] Login Success',
    props<{ user: User }>()
);

export const LogInFailed = createAction(
    '[AUTH] Login Failed',
    props<{ error: string }>()
);

export const SignUp = createAction(
    '[AUTH] Signup',
    props<{ payload }>()
);