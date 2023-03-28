import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AppConfig, LayoutType } from '@app/shared/types/app-config.interface';
import { Subscription, Observable } from 'rxjs';
import { getAppConfig } from '@app/store/app-config/app-config.selector';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.layout]': 'true'
    }
})
export class AppLayoutComponent implements OnInit {

    layout: LayoutType;
    subscription: Subscription;
    private app$: Observable<AppConfig> = this.store.select(getAppConfig);

    constructor(
        private cdr: ChangeDetectorRef,
        private store: Store) {
    }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.layout = app.layoutType
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
