import { environment } from './../environments/environment.prod';
import { reducers, metaReducers, stateEffects } from './store/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        TranslateModule.forRoot(),
        LayoutModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: { strictActionImmutability: true, strictStateImmutability: true }
        }),
        EffectsModule.forRoot(stateEffects),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
