
import { User } from '@app/shared/types/user.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { LogInFailed, LogInSuccess, LogOut } from './user.action';

export interface userState {
    isLoggedIn: boolean;
    account: User;
};

export const initialState: userState = {
    isLoggedIn: false,
    account: null
};

const reducer = createReducer(
    initialState,
    on(LogInSuccess, (state, payload) => ({ ...state, isLoggedIn: true, account: payload.user })),
    on(LogInFailed, state => ({ ...state, isLoggedIn: false, account: null })),
    on(LogOut, state => ({ ...state, isLoggedIn: false, account: null }))
);

export function userReducer(state: userState, action: Action) {
    return reducer(state, action);
}