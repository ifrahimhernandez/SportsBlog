import { State } from '../index';
import { createSelector } from "@ngrx/store";

export const getUser = (state: State) => state.user;

export const getLoginStatus = () =>
    createSelector(getUser, userState => userState.isLoggedIn);