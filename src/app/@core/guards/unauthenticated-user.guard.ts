import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class UnauthenticatedUserGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router) { }

    async canActivate() {

        const isLoggedIn = await this.auth.isLoggedIn();
        if (isLoggedIn) return true;

        console.warn('UnauthenticatedUserGuard: user not logged in: redirected to login page');
        return this.router.parseUrl('/login');
    }
}
