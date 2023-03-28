import { getAppConfig } from './../../../store/app-config/app-config.selector';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { UpdateSideNavCollapse, UpdateMobileNavCollapse } from '@app/store/app-config/app-config.action'

@Component({
    selector: 'nav-toggle',
    templateUrl: './nav-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavToggleComponent implements OnInit {
    private app$: Observable<AppConfig> = this.store.select(getAppConfig);
    private isCollapse: boolean
    private isMobileCollapse: boolean
    @Input() isMobile: boolean

    constructor(private store: Store, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.app$.subscribe(app => {
            this.isCollapse = app.sideNavCollapse
            this.isMobileCollapse = app.mobileNavCollapse
            this.cdr.markForCheck()
        });
    }

    updateSideNavCollapse() {
        this.store.dispatch(UpdateSideNavCollapse({ sideNavCollapse: this.isCollapse }));
    }

    toggleNavCollapse() {
        if (!this.isMobile) {
            this.isCollapse = !this.isCollapse;
            this.store.dispatch(UpdateSideNavCollapse({ sideNavCollapse: this.isCollapse }));
        } else {
            this.isMobileCollapse = !this.isMobileCollapse
            this.store.dispatch(UpdateMobileNavCollapse({ mobileNavCollapse: this.isMobileCollapse }));
        }
    }
}
