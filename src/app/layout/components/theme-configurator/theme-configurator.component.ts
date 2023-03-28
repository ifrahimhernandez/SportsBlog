import { UpdateConfig } from '../../../store/app-config/app-config.action';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { Store } from '@ngrx/store';
import { getAppConfig } from '@app/store/app-config/app-config.selector';

@Component({
    selector: 'theme-configurator',
    templateUrl: 'theme-configurator.component.html'
})

export class ThemeConfiguratorComponent implements OnInit {

    config: AppConfig
    subscription: Subscription
    headerNavColors: string[] = ['#ffffff', '#11a1fd', '#00c569', '#5a75f9', '#ffc833', '#f46363']
    private app$: Observable<AppConfig> = this.store.select(getAppConfig);

    constructor(private store: Store) { }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.config = app
        });
    }

    configChange() {
        console.log('configChange', this.config);
        this.store.dispatch(UpdateConfig(this.config));
    }

    onColorChange(color: string) {
        this.config.headerNavColor = color
        this.configChange()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}