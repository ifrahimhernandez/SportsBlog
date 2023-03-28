import { UpdateConfig, UpdateCurrentLanguage, UpdateMobileNavCollapse, UpdateSideNavCollapse } from './app-config.action';
import { AppConfig } from '../../shared/types/app-config.interface';
import { AppConfiguration } from '@app/configs/app.config';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState = {
    ...AppConfiguration
};

const reducer = createReducer(
    initialState,
    on(UpdateConfig, (state, payload) => ({ ...state, ...payload })),
    on(UpdateSideNavCollapse, (state, payload) => ({ ...state, ...payload })),
    on(UpdateMobileNavCollapse, (state, payload) => ({ ...state, ...payload })),
    on(UpdateCurrentLanguage, (state, payload) => ({ ...state, ...payload })),
);

export function appConfigReducer(state: AppConfig, action: Action) {
    return reducer(state, action);
}
