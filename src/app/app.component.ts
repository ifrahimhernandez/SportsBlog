import { AppConfig } from './shared/types/app-config.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import en_US from './i18n/lang_en.json'
import fr_FR from './i18n/lang_fr.json';
import es_ES from './i18n/lang_es.json';
import { getAppConfig } from './store/app-config/app-config.selector';
import { Store } from '@ngrx/store';

const storageKey = 'lang'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    private langChangeSubscription!: Subscription;
    private app$: Observable<AppConfig> = this.store.select(getAppConfig);
    currentLang: string;
    subscription: Subscription;

    constructor(private translateService: TranslateService,
        private store: Store) {
        translateService.setTranslation('en_US', en_US);
        translateService.setTranslation('fr_FR', fr_FR);
        translateService.setTranslation('es_ES', es_ES);
    }

    ngOnInit() {
        this.app$.subscribe(app => {
            this.currentLang = localStorage.getItem(storageKey) || app.lang || this.translateService.getBrowserCultureLang();
            this.translateService.use(this.currentLang);
        });
        this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem(storageKey, event.lang);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    }

}
