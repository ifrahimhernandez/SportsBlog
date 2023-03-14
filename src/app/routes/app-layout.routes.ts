import { LogoutGuard } from './../shared/guards/logout.guard';
import { Routes } from '@angular/router';

export const APP_LAYOUT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../views/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'logout',
        canActivate: [LogoutGuard],
        loadChildren: () => import('../views/auth/auth.module').then(m => m.AuthModule),
    }
];