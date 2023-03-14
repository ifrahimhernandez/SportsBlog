import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AppLayoutComponent } from "./layout/app-layout/app-layout-component";

import { AUTH_LAYOUT_ROUTES } from "./routes/auth-layout.routes";
import { APP_LAYOUT_ROUTES } from './routes/app-layout.routes';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: APP_LAYOUT_ROUTES
    },
    {
        path: 'o',
        canActivate: [LoginGuard],
        component: AuthLayoutComponent,
        children: AUTH_LAYOUT_ROUTES
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}