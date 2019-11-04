import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router) { }

    async canActivate() {

        const isLoggedIn = await this.auth.isLoggedIn();
        if (!isLoggedIn) return true;

        console.warn('LoggedInGuard: user logged in: redirected to home page');
        return this.router.parseUrl('/home');
    }
}
