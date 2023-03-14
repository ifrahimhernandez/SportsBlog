import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '@app/configs/app.config';
interface User {
    id: number;
    username: string;
    password: string;
    token?: string;
    first_name: string;
    last_name: string;
    nbf: number;
    exp: number;
    iat: number;
}
const USER_AUTH_API_URL = '/auth/signIn';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${API_ENDPOINT}${USER_AUTH_API_URL}`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        console.log("logged out")
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['o/auth/login']);
    }

    isAuthenticated() {
        return localStorage.getItem('currentUser') !== null;
    }

    isTokenExpired() {
        const currentUser = this.currentUserSubject.value;
        const expirationDate = new Date(currentUser.exp * 1000);
        if (currentUser && currentUser.token && expirationDate < new Date()) {
            this.logout();
            return true;
        }
        return false;
    }
}