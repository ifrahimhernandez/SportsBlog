import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router) { }

  canActivate(): UrlTree {
    this.auth.logout();
    return this.router.createUrlTree(['auth', 'login']);
  }

}
