import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { ErrorsRoutingModule } from './errors-routing.module';

import { ErrorComponent } from './error/error.component';

@NgModule({
    declarations: [
        ErrorComponent,
    ],
    imports: [
        ErrorsRoutingModule,
        SharedModule,
        LogoModule,
    ],
    exports: [],
    providers: [],
})
export class ErrorsModule { }