import { UpdateMobileNavCollapse } from '@app/store/app-config/app-config.action';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AppConfig, NavMenuColor } from '@app/shared/types/app-config.interface';
import { Store } from '@ngrx/store';
import { getAppConfig } from '@app/store/app-config/app-config.selector';

@Component({
    selector: 'mobile-nav',
    templateUrl: 'mobile-nav.component.html',
    host: {
        '[class.mobile-nav]': 'true',
        '[class.is-open]': 'isOpen',
        '[class.nav-menu-light]': "color === 'light'",
        '[class.nav-menu-dark]': "color === 'dark'"
    }
})

export class MobileNavComponent implements OnInit {
    @Input() isOpen: boolean
    @Input() color: NavMenuColor = 'light';
    subscription: Subscription;
    private app$: Observable<AppConfig> = this.store.select(getAppConfig);

    constructor(private cdr: ChangeDetectorRef, private store: Store) { }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.isOpen = app.mobileNavCollapse
            this.cdr.markForCheck()
        });
    }

    closeNav() {
        this.isOpen = false;
        this.store.dispatch(UpdateMobileNavCollapse({ mobileNavCollapse: this.isOpen }));
    }

    onClicked() {
        this.closeNav()
    }
}