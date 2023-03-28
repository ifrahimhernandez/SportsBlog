import { createAction, props } from '@ngrx/store';
import { AppConfig } from '@app/shared/types/app-config.interface';

export const UpdateConfig = createAction(
    '[AppConfig] Update Config',
    props<AppConfig>()
);

export const UpdateSideNavCollapse = createAction(
    '[AppConfig] Update Side Nav Collapse',
    props<{ sideNavCollapse: boolean }>()
);

export const UpdateMobileNavCollapse = createAction(
    '[AppConfig] Update Mobile Nav Collapse',
    props<{ mobileNavCollapse: boolean }>()
);

export const UpdateCurrentLanguage = createAction(
    '[AppConfig] Update Current Language',
    props<{ lang: string }>()
);