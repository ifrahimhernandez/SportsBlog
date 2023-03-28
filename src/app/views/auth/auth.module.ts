import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterFormComponent,
        LoginFormComponent,
        RegisterComponent
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        LogoModule,
        LogoModule,
        NgBootstrapFormValidationModule.forRoot(),
    ]
})
export class AuthModule { }
