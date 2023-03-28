import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LogOut } from '@app/store/user/user.action';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store) { }

  canActivate(): UrlTree {
    this.store.dispatch(LogOut());
    return this.router.createUrlTree(['auth', 'login']);
  }

}
