import { AppConfig } from './../shared/types/app-config.interface';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { appConfigReducer } from './app-config/app-config.reducer';
import { UserEffects } from './user/user.effects';
import { userReducer, userState } from './user/user.reducer';

// Add state to this interface
export interface State {
    user: userState;
    app: AppConfig
}

// Add effects to this array
export const stateEffects = [
    UserEffects
];

// Add reducers to this array
export const reducers: ActionReducerMap<State> = {
    user: userReducer,
    app: appConfigReducer
};

// console.log all actions
export const debug = (reducer: ActionReducer<State>): ActionReducer<State> => {
    return (state, action) => {
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];