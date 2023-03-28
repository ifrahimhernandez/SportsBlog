import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LogIn } from '@app/store/user/user.action';
import { Store } from '@ngrx/store';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    showResult = false;
    showPassword = false;
    showForgotPassword = false;
    loading = false;
    submitted = false;
    error = '';
    private subs = new Subscription();
    @Input() thirdPartyLogin = true


    constructor(private formBuilder: FormBuilder,
        private store: Store) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            username: ['', [
                Validators.required
            ]],
            password: ['', [
                Validators.required
            ]]
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    // convenience getter for easy access to form fields
    get f() { return this.formGroup.controls; }

    login() {
        this.showResult = false;
        this.submitted = true;

        // stop here if form is invalid
        if (this.formGroup.invalid) return;

        this.store.dispatch(LogIn({
            username: this.f.username.value,
            password: this.f.password.value
        }));
    }

    onShowPasswordClick() {
        this.showPassword = !this.showPassword
    }

    onReset() {
        this.formGroup.reset();
    }
}
