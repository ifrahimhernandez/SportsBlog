import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';

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
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

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

        this.loading = true;
        this.subs.add(this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: (data) => {
                    if (data.type === 'error') {
                        this.loading = false;
                        this.showResult = true;
                    } else {
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                        this.router.navigateByUrl(returnUrl);
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            }));
    }

    onShowPasswordClick() {
        this.showPassword = !this.showPassword
    }

    onReset() {
        this.formGroup.reset();
    }
}
